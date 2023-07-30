import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {BinarySampleType} from '../../parameters/is-binary-radio/is-binary-radio.model';
import {getSuitableHintContent} from '../../hint-content/hint-content.utils';
import {HintContentModel} from '../../hint-content/hint-content.model';

@Component({
  template: '',
})
export abstract class BaseCalculationFormComponent<CalcResponse, ResultParams> implements OnInit {

  abstract form: FormGroup
  abstract hints: HintContentModel[]

  lastAppliedResult: ResultParams | null = null

  ngOnInit(): void {
    this.form.get('type')?.valueChanges.subscribe(
      value => {
        if (value === BinarySampleType.BINARY) {
          this.form.get('p')?.setValidators(Validators.required)
          this.form.get('variance')?.clearValidators()

        }
        if (value === BinarySampleType.NON_BINARY) {
          this.form.get('variance')?.setValidators(Validators.required)
          this.form.get('p')?.clearValidators()
        }
      },
    )
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

  handleResponse = (response: CalcResponse) => {
    this.lastAppliedResult = this.getCalculationParams(response)
  }

  protected abstract getCalculationParams(response: CalcResponse): ResultParams

  abstract onSubmit(): void

}
