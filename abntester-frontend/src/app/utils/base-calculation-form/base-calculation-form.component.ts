import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {BinarySampleType} from '../../parameters/is-binary-radio/is-binary-radio.model';
import {getSuitableHintContent} from '../../hint-content/hint-content.utils';
import {HintContentModel} from '../../hint-content/hint-content.model';
import {ActivatedRoute, Router} from '@angular/router';
import {tuiMarkControlAsTouchedAndValidate} from '@taiga-ui/cdk';
import {Clipboard} from '@angular/cdk/clipboard';
import {TuiAlertService, TuiNotification} from '@taiga-ui/core';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
declare var ym:any;

const showResultParam = "showResult"

@Component({
  template: '',
})
export abstract class BaseCalculationFormComponent<CalcResponse, ResultParams> implements OnInit {

  protected constructor(protected router: Router, protected route: ActivatedRoute,
                        protected clipboard: Clipboard, protected readonly alerts: TuiAlertService,
                        protected location: Location) {
  }

  abstract form: FormGroup
  abstract hints: HintContentModel[]

  lastAppliedResult: ResultParams | null = null

  showShareButton = false

  ngOnInit(): void {
    this.initForm()
    this.form.patchValue(this.route.snapshot.queryParams)
    this.setProbabilityVarianceValidation(this.form.get('type')?.value)
    tuiMarkControlAsTouchedAndValidate(this.form)
    this.form.valueChanges.subscribe(_ => {
      this.changeRoute()
    })
    this.form.get('type')?.valueChanges.subscribe(
      value => this.setProbabilityVarianceValidation(value),
    )
    if (this.route.snapshot.queryParams[showResultParam]) {
      this.onSubmit()
    }
  }

  protected abstract getCalculationParams(response: CalcResponse): ResultParams

  protected abstract calculate(): Observable<CalcResponse>

  protected abstract getLinkParams(): { [key: string]: any; }

  protected initForm(): void {
  }

  private setProbabilityVarianceValidation = (value: BinarySampleType) => {
    if (value === BinarySampleType.BINARY) {
      this.form.get('p')?.setValidators(Validators.required)
      this.form.get('p')?.enable()
      this.form.get('variance')?.clearValidators()
      this.form.get('variance')?.disable()
    }
    if (value === BinarySampleType.NON_BINARY) {
      this.form.get('variance')?.setValidators(Validators.required)
      this.form.get('variance')?.enable()
      this.form.get('p')?.clearValidators()
      this.form.get('p')?.disable()
    }
  }

  private async changeRoute() {
    return await this.router.navigate(this.route.snapshot.url.map(urlSegment => urlSegment.path), {
      queryParams: this.form.value,
    });
  }

  isBinaryCase() {
    return this.form.get('type')?.value === BinarySampleType.BINARY
  }

  isNonBinaryCase() {
    return this.form.get('type')?.value === BinarySampleType.NON_BINARY
  }

  getSuitableHintContent() {
    return getSuitableHintContent(this.form.get('type')?.value, this.form.get('alternative')?.value, this.hints)
  }

  share() {
    const url = window.location.href.split('?')[0]
    const linkParams = this.getLinkParams()
    linkParams[showResultParam] = "1"
    const queryString = new URLSearchParams(linkParams).toString()
    const fullLink = `${url}?${queryString}`
    const result = this.clipboard.copy(fullLink)
    const status = result ? TuiNotification.Success : TuiNotification.Error
    const msg = result ? 'Ссылка успешно скопирована в буфер обмена' : 'Скопировать ссылку не удалось'
    this.alerts.open(msg, {status: status}).subscribe()
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    const params = this.form.value
    ym(94541330, 'reachGoal', this.targetName(), params)
    this.calculate().subscribe(this.handleResponse)
  }

  protected abstract targetName(): string

  private handleResponse = (response: CalcResponse) => {
    this.lastAppliedResult = this.getCalculationParams(response)
    this.showShareButton = true
  }
}
