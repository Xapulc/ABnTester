import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OneSampleCalculationService} from './one-sample-calculation.service';
import {CalculateOneSampleResponse} from './one-sample-form-model';
import {oneSampleHints} from './one-sample-hint-messages.model';
import {StandardCalculationContent} from '../standard-calculation-result/standard-calculation-result.model';
import {
  getCalculationContent,
  OneSampleStandardCalculationResultParams,
} from './one-sample-calculation-result-messages.model';
import {BaseCalculationFormComponent} from '../utils/base-calculation-form/base-calculation-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Clipboard} from '@angular/cdk/clipboard';
import {TuiAlertService} from '@taiga-ui/core';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {aplhaPlusBetaValidator} from '../utils/validator/alpha-beta-validator';
import {binaryMdeValidator} from '../utils/validator/binary-mde-validator';

@Component({
  selector: 'app-one-sample-form',
  templateUrl: './one-sample-form.component.html',
})
export class OneSampleFormComponent extends BaseCalculationFormComponent<CalculateOneSampleResponse, OneSampleStandardCalculationResultParams> {

  constructor(override router: Router, override route: ActivatedRoute, private oneSampleCalculationService: OneSampleCalculationService,
              override clipboard: Clipboard, @Inject(TuiAlertService) override readonly alerts: TuiAlertService,
              override location: Location) {
    super(router, route, clipboard, alerts, location)
  }

  override initForm() {

  }

  form: FormGroup = new FormGroup({
    alpha: new FormControl(5, Validators.required),
    beta: new FormControl(20, Validators.required),
    mde: new FormControl(1, Validators.required),
    p: new FormControl(10, Validators.required),
    variance: new FormControl(100),
    alternative: new FormControl('RIGHT_SIDED', Validators.required),
    type: new FormControl('BINARY', Validators.required),
  }, [aplhaPlusBetaValidator, binaryMdeValidator]);
  hints = oneSampleHints

  calculate(): Observable<CalculateOneSampleResponse> {
    if (this.isBinaryCase()) {
      return this.oneSampleCalculationService.calculateBinary(this.form.value)
    }
    return this.oneSampleCalculationService.calculateNonBinary(this.form.value)
  }

  getSuitableCalculationContent(): StandardCalculationContent {
    return getCalculationContent(this.lastAppliedResult!);
  }

  protected getCalculationParams(response: CalculateOneSampleResponse): OneSampleStandardCalculationResultParams {
    return {
      p0: this.form.get('p')?.value,
      mde: this.form.get('mde')?.value,
      alpha: this.form.get('alpha')?.value,
      beta: this.form.get('beta')?.value,
      sampleSize: response.sampleSize,
      alternative: this.form.get('alternative')?.value,
      type: this.form.get('type')?.value,
      variance: this.form.get('variance')?.value,
    }
  }


  protected override getLinkParams() {
    return {
      ...(this.isBinaryCase() && {p: this.lastAppliedResult?.p0}),
      mde: this.lastAppliedResult?.mde,
      alpha: this.lastAppliedResult?.alpha,
      beta: this.lastAppliedResult?.beta,
      type: this.lastAppliedResult?.type,
      alternative: this.lastAppliedResult?.alternative,
      ...(this.isNonBinaryCase() && {variance: this.lastAppliedResult?.variance}),
    }
  }

  protected override targetName(): string {
    return "ONE_SAMPLE";
  }
}
