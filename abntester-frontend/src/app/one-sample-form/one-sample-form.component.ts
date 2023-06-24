import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OneSampleCalculationService} from './one-sample-calculation.service';
import {BinarySampleType} from '../parameters/is-binary-radio/is-binary-radio.model';
import {
  CalculateOneSampleBinaryRequest,
  CalculateOneSampleNonBinaryRequest,
  CalculateOneSampleResponse,
} from './one-sample-form-model';

@Component({
  selector: 'app-one-sample-form',
  templateUrl: './one-sample-form.component.html',
})
export class OneSampleFormComponent {

  constructor(private oneSampleCalculationService: OneSampleCalculationService) {
  }

  showResult = false
  sampleSize: number = 0

  form: FormGroup = new FormGroup({
    alpha: new FormControl(5, Validators.required),
    beta: new FormControl(5, Validators.required),
    mde: new FormControl(5, Validators.required),
    probability: new FormControl(5, Validators.required),
    variance: new FormControl(100),
    alternative: new FormControl('ONE_SIDED', Validators.required),
    type: new FormControl('BINARY', Validators.required),
  });

  ngOnInit(): void {
    this.form.get('type')?.valueChanges.subscribe(
      value => {
        if (value === BinarySampleType.BINARY) {
          this.form.get('probability')?.setValidators(Validators.required)
          this.form.get('variance')?.clearValidators()
        }
        if (value === BinarySampleType.NON_BINARY) {
          this.form.get('variance')?.setValidators(Validators.required)
          this.form.get('probability')?.clearValidators()
        }
      },
    )
  }

  onSubmit(): void {
    if (this.isBinaryCase()) {
      this.oneSampleCalculationService.calculateBinary(this.formToBinaryCalcRequest()).subscribe(this.handleResponse)
    }
    if (this.isNonBinaryCase()) {
      this.oneSampleCalculationService.calculateNonBinary(this.formToNonBinaryCalcRequest()).subscribe(this.handleResponse)
    }
  }

  private handleResponse = (response: CalculateOneSampleResponse) => {
    this.showResult = true
    this.sampleSize = response.sampleSize
  }

  private formToNonBinaryCalcRequest(): CalculateOneSampleNonBinaryRequest {
    return <CalculateOneSampleNonBinaryRequest>{
      alpha: this.form.get('alpha')?.value,
      beta: this.form.get('beta')?.value,
      variance: this.form.get('variance')?.value,
      mde: this.form.get('mde')?.value,
      alternative: this.form.get('alternative')?.value,
    }
  }

  private formToBinaryCalcRequest(): CalculateOneSampleBinaryRequest {
    return <CalculateOneSampleBinaryRequest>{
      alpha: this.form.get('alpha')?.value,
      beta: this.form.get('beta')?.value,
      p: this.form.get('probability')?.value,
      mde: this.form.get('mde')?.value,
      alternative: this.form.get('alternative')?.value,
    }
  }

  isBinaryCase() {
    return this.form.get('type')?.value === BinarySampleType.BINARY
  }

  isNonBinaryCase() {
    return this.form.get('type')?.value === BinarySampleType.NON_BINARY
  }

}
