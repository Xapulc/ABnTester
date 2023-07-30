import {Component} from '@angular/core';
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

@Component({
  selector: 'app-one-sample-form',
  templateUrl: './one-sample-form.component.html',
})
export class OneSampleFormComponent extends BaseCalculationFormComponent<CalculateOneSampleResponse, OneSampleStandardCalculationResultParams> {

  constructor(private oneSampleCalculationService: OneSampleCalculationService) {
    super()
  }

  form: FormGroup = new FormGroup({
    alpha: new FormControl(5, Validators.required),
    beta: new FormControl(20, Validators.required),
    mde: new FormControl(1, Validators.required),
    probability: new FormControl(10, Validators.required),
    variance: new FormControl(100),
    alternative: new FormControl('RIGHT_SIDED', Validators.required),
    type: new FormControl('BINARY', Validators.required),
  });
  hints = oneSampleHints

  onSubmit(): void {
    if (this.isBinaryCase()) {
      this.oneSampleCalculationService.calculateBinary(this.form.value).subscribe(this.handleResponse)
    }
    if (this.isNonBinaryCase()) {
      this.oneSampleCalculationService.calculateNonBinary(this.form.value).subscribe(this.handleResponse)
    }
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
}
