import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  CalculateTwoSampleBinaryRequest,
  CalculateTwoSampleNonBinaryRequest, CalculateTwoSampleResponse,
  TwoSampleType,
} from './two-sample-form-model';
import {TwoSampleCalculationService} from './two-sample-calculation.service';

@Component({
  selector: 'app-two-sample-form',
  templateUrl: './two-sample-form.component.html',
  styleUrls: ['./two-sample-form.component.css'],
})
export class TwoSampleFormComponent implements OnInit {

  constructor(private twoSampleCalculationService: TwoSampleCalculationService) {
  }

  showResult = false
  leftSampleSize: number = 0
  rightSampleSize: number = 0

  form: FormGroup = new FormGroup({
    alpha: new FormControl(5, Validators.required),
    beta: new FormControl(5, Validators.required),
    mde: new FormControl(5, Validators.required),
    probability: new FormControl(5, Validators.required),
    variance: new FormControl(100),
    firstSampleProportion: new FormControl(50, Validators.required),
    secondSampleProportion: new FormControl({value: 50, disabled: true}, Validators.required),
    alternative: new FormControl('ONE_SIDED', Validators.required),
    type: new FormControl('BINARY', Validators.required),
  });

  ngOnInit(): void {
    this.form.get('firstSampleProportion')?.valueChanges.subscribe(
      value => {
        if (value != null) {
          this.form.get('secondSampleProportion')?.setValue(100 - value)
        }
      });
    this.form.get('type')?.valueChanges.subscribe(
      value => {
        if (value === TwoSampleType.BINARY) {
          this.form.get('probability')?.setValidators(Validators.required)
          this.form.get('variance')?.clearValidators()
        }
        if (value === TwoSampleType.NON_BINARY) {
          this.form.get('variance')?.setValidators(Validators.required)
          this.form.get('probability')?.clearValidators()
        }
      },
    )
  }

  onSubmit(): void {
    if (this.isBinaryCase()) {
      this.twoSampleCalculationService.calculateBinary(this.formToBinaryCalcRequest()).subscribe(this.handleResponse)
    }
    if (this.isNonBinaryCase()) {
      this.twoSampleCalculationService.calculateNonBinary(this.formToNonBinaryCalcRequest()).subscribe(this.handleResponse)
    }
  }

  private handleResponse = (response: CalculateTwoSampleResponse) => {
    this.showResult = true
    this.rightSampleSize = response.rightSampleSize
    this.leftSampleSize = response.leftSampleSize
  }

  private formToNonBinaryCalcRequest(): CalculateTwoSampleNonBinaryRequest {
    return <CalculateTwoSampleNonBinaryRequest>{
      alpha: this.form.get('alpha')?.value / 100,
      beta: this.form.get('beta')?.value / 100,
      variance: this.form.get('variance')?.value,
      mde: this.form.get('mde')?.value / 100,
      alternative: this.form.get('alternative')?.value,
      leftProportion: this.form.get('firstSampleProportion')?.value / 100,
    }
  }

  private formToBinaryCalcRequest(): CalculateTwoSampleBinaryRequest {
    return <CalculateTwoSampleBinaryRequest>{
      alpha: this.form.get('alpha')?.value / 100,
      beta: this.form.get('beta')?.value / 100,
      p: this.form.get('probability')?.value / 100,
      mde: this.form.get('mde')?.value / 100,
      alternative: this.form.get('alternative')?.value,
      leftProportion: this.form.get('firstSampleProportion')?.value / 100,
    }
  }

  isBinaryCase() {
    return this.form.get('type')?.value === TwoSampleType.BINARY
  }

  isNonBinaryCase() {
    return this.form.get('type')?.value === TwoSampleType.NON_BINARY
  }
}
