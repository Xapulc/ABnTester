import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OneSampleCalculationService} from './one-sample-calculation.service';
import {BinarySampleType} from '../parameters/is-binary-radio/is-binary-radio.model';
import {
  CalculateOneSampleBinaryRequest,
  CalculateOneSampleNonBinaryRequest,
  CalculateOneSampleResponse,
} from './one-sample-form-model';
import {getSuitableHintContent} from '../hint-content/hint-content.utils';
import {oneSampleHints} from './one-sample-hint-messages.model';
import {StandardCalculationContent} from '../standard-calculation-result/standard-calculation-result.model';
import {
  getCalculationContent,
  OneSampleStandardCalculationResultParams,
} from './one-sample-calculation-result-messages.model';

@Component({
  selector: 'app-one-sample-form',
  templateUrl: './one-sample-form.component.html',
})
export class OneSampleFormComponent {

  constructor(private oneSampleCalculationService: OneSampleCalculationService) {
  }

  lastAppliedResult: OneSampleStandardCalculationResultParams | null = null

  form: FormGroup = new FormGroup({
    alpha: new FormControl(5, Validators.required),
    beta: new FormControl(20, Validators.required),
    mde: new FormControl(1, Validators.required),
    probability: new FormControl(10, Validators.required),
    variance: new FormControl(100),
    alternative: new FormControl('RIGHT_SIDED', Validators.required),
    type: new FormControl('BINARY', Validators.required),
  });

  ngOnInit(): void {
    this.form.get('type')?.valueChanges.subscribe(
      (value: BinarySampleType) => {
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
    this.lastAppliedResult = this.getCalculationParams(response.sampleSize)
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

  getSuitableHintContent() {
    return getSuitableHintContent(this.form.get('type')?.value, this.form.get('alternative')?.value, oneSampleHints)
  }

  getSuitableCalculationContent(): StandardCalculationContent {
    return getCalculationContent(this.lastAppliedResult!);
  }

  private getCalculationParams(sampleSize: number): OneSampleStandardCalculationResultParams {
    const type: BinarySampleType = this.form.get('type')?.value
    return {
      p0: this.form.get('probability')?.value,
      mde: this.form.get('mde')?.value,
      alpha: this.form.get('alpha')?.value,
      beta: this.form.get('beta')?.value,
      sampleSize: sampleSize,
      alternative: this.form.get('alternative')?.value,
      type: this.form.get('type')?.value,
      variance: this.form.get('variance')?.value,
    }
  }
}
