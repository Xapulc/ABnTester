import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CalculateTwoSampleResponse} from './two-sample-form-model';
import {TwoSampleCalculationService} from './two-sample-calculation.service';
import Decimal from 'decimal.js';
import {
  getCalculationContent,
  TwoSampleStandardCalculationResultParams,
} from './two-sample-calculation-result-messages.model';
import {BaseCalculationFormComponent} from '../utils/base-calculation-form/base-calculation-form.component';
import {HintContentModel} from '../hint-content/hint-content.model';
import {twoSampleHints} from './two-sample-hint-messages.model';

@Component({
  selector: 'app-two-sample-form',
  templateUrl: './two-sample-form.component.html',
})
export class TwoSampleFormComponent extends BaseCalculationFormComponent<CalculateTwoSampleResponse, TwoSampleStandardCalculationResultParams> implements OnInit {

  constructor(private twoSampleCalculationService: TwoSampleCalculationService) {
    super()
  }

  hints: HintContentModel[] = twoSampleHints

  form: FormGroup = new FormGroup({
    alpha: new FormControl(5, Validators.required),
    beta: new FormControl(20, Validators.required),
    mde: new FormControl(1, Validators.required),
    p: new FormControl(10, Validators.required),
    variance: new FormControl(100),
    alternative: new FormControl('RIGHT_SIDED', Validators.required),
    type: new FormControl('BINARY', Validators.required),
    leftProportion: new FormControl(50, Validators.required),
    rightProportion: new FormControl({value: 50, disabled: true}, Validators.required),
  });

  override ngOnInit(): void {
    this.form.get('leftProportion')?.valueChanges.subscribe(
      value => {
        if (value != null) {
          this.form.get('rightProportion')?.setValue(new Decimal(100).minus(new Decimal(value)).toNumber())
        }
      });
  }

  onSubmit(): void {
    if (this.isBinaryCase()) {
      this.twoSampleCalculationService.calculateBinary(this.form.value).subscribe(this.handleResponse)
    }
    if (this.isNonBinaryCase()) {
      this.twoSampleCalculationService.calculateNonBinary(this.form.value).subscribe(this.handleResponse)
    }
  }

  getSuitableCalculationContent() {
    return getCalculationContent(this.lastAppliedResult!)
  }

  protected getCalculationParams(response: CalculateTwoSampleResponse): TwoSampleStandardCalculationResultParams {
    return {
      p0: this.form.get('p')?.value,
      mde: this.form.get('mde')?.value,
      alpha: this.form.get('alpha')?.value,
      beta: this.form.get('beta')?.value,
      firstSampleSize: response.leftSampleSize,
      secondSampleSize: response.rightSampleSize,
      alternative: this.form.get('alternative')?.value,
      type: this.form.get('type')?.value,
      variance: this.form.get('variance')?.value,
    }
  }
}
