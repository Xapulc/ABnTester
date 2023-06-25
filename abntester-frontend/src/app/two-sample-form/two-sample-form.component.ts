import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  CalculateTwoSampleBinaryRequest,
  CalculateTwoSampleNonBinaryRequest,
  CalculateTwoSampleResponse,
} from './two-sample-form-model';
import {TwoSampleCalculationService} from './two-sample-calculation.service';
import Decimal from 'decimal.js';
import {BinarySampleType} from '../parameters/is-binary-radio/is-binary-radio.model';

@Component({
  selector: 'app-two-sample-form',
  templateUrl: './two-sample-form.component.html',
})
export class TwoSampleFormComponent implements OnInit {

  constructor(private twoSampleCalculationService: TwoSampleCalculationService) {
  }

  showResult = false
  leftSampleSize: number = 0
  rightSampleSize: number = 0

  form: FormGroup = new FormGroup({
    alpha: new FormControl(5, Validators.required),
    beta: new FormControl(20, Validators.required),
    mdePercent: new FormControl(1.5, Validators.required),
    mdeAbs: new FormControl(1),
    probability: new FormControl(10, Validators.required),
    variance: new FormControl(100),
    alternative: new FormControl('RIGHT_SIDED', Validators.required),
    type: new FormControl('BINARY', Validators.required),
    firstSampleProportion: new FormControl(50, Validators.required),
    secondSampleProportion: new FormControl({value: 50, disabled: true}, Validators.required),
  });

  ngOnInit(): void {
    this.form.get('firstSampleProportion')?.valueChanges.subscribe(
      value => {
        if (value != null) {
          this.form.get('secondSampleProportion')?.setValue(new Decimal(100).minus(new Decimal(value)).toNumber())
        }
      });
    this.form.get('type')?.valueChanges.subscribe(
      value => {
        if (value === BinarySampleType.BINARY) {
          this.form.get('probability')?.setValidators(Validators.required)
          this.form.get('mdePercent')?.setValidators(Validators.required)
          this.form.get('variance')?.clearValidators()
          this.form.get('mdeAbs')?.clearValidators()
        }
        if (value === BinarySampleType.NON_BINARY) {
          this.form.get('variance')?.setValidators(Validators.required)
          this.form.get('mdeAbs')?.setValidators(Validators.required)
          this.form.get('probability')?.clearValidators()
          this.form.get('mdePercent')?.clearValidators()
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
      alpha: this.form.get('alpha')?.value,
      beta: this.form.get('beta')?.value,
      variance: this.form.get('variance')?.value,
      mde: this.form.get('mdeAbs')?.value,
      alternative: this.form.get('alternative')?.value,
      leftProportion: this.form.get('firstSampleProportion')?.value,
    }
  }

  private formToBinaryCalcRequest(): CalculateTwoSampleBinaryRequest {
    return <CalculateTwoSampleBinaryRequest>{
      alpha: this.form.get('alpha')?.value,
      beta: this.form.get('beta')?.value,
      p: this.form.get('probability')?.value,
      mde: this.form.get('mdePercent')?.value,
      alternative: this.form.get('alternative')?.value,
      leftProportion: this.form.get('firstSampleProportion')?.value,
    }
  }

  isBinaryCase() {
    return this.form.get('type')?.value === BinarySampleType.BINARY
  }

  isNonBinaryCase() {
    return this.form.get('type')?.value === BinarySampleType.NON_BINARY
  }
}
