import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CalculateTwoSampleResponse} from './sequential-two-sample-form-model';
import {TwoSampleCalculationService} from './sequential-two-sample-calculation.service';
import {
  getCalculationContent,
  TwoSampleStandardCalculationResultParams,
} from './sequential-two-sample-calculation-result-messages.model';
import {BaseCalculationFormComponent} from '../utils/base-calculation-form/base-calculation-form.component';
import {HintContentModel, HintContentParams} from '../hint-content/hint-content.model';
import {twoSampleHints} from './sequential-two-sample-hint-messages.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Clipboard} from '@angular/cdk/clipboard';
import {TuiAlertService} from '@taiga-ui/core';
import {Location} from '@angular/common';
import {Observable, of} from 'rxjs';
import {aplhaPlusBetaValidator} from '../utils/validator/alpha-beta-validator';
import {binaryMdeValidator} from '../utils/validator/binary-mde-validator';
import {BinarySampleType} from "../parameters/is-binary-radio/is-binary-radio.model";
import {getSuitableHintContent} from '../hint-content/hint-content.utils';
import {OneTwoSidedAlternativeType} from "../parameters/one-two-sided-alternative/one-two-sided-alternative.model";


@Component({
  selector: 'app-sequential-two-sample-form',
  templateUrl: './sequential-two-sample-form.component.html',
})
export class SequentialTwoSampleFormComponent extends BaseCalculationFormComponent<CalculateTwoSampleResponse, TwoSampleStandardCalculationResultParams> {

  typeForm = new FormControl({value: 'BINARY', disabled: true})
  leftProportionForm = new FormControl({value: 50, disabled: true})
  rightProportionForm = new FormControl({value: 50, disabled: true})

  form: FormGroup = new FormGroup({
    alpha: new FormControl(5, Validators.required),
    beta: new FormControl(20, Validators.required),
    mde: new FormControl(1, Validators.required),
    p: new FormControl(10, Validators.required),
    alternative: new FormControl('RIGHT_SIDED', Validators.required),
  }, [aplhaPlusBetaValidator, binaryMdeValidator]);

  hints: HintContentModel[] = twoSampleHints

  constructor(override router: Router, override route: ActivatedRoute, private twoSampleCalculationService: TwoSampleCalculationService,
              override clipboard: Clipboard, @Inject(TuiAlertService) override readonly alerts: TuiAlertService,
              override location: Location) {
    super(router, route, clipboard, alerts, location)
  }

  calculate(): Observable<CalculateTwoSampleResponse> {
    if (this.form.get('alternative')?.value == OneTwoSidedAlternativeType.TWO_SIDED) {
      return of(<CalculateTwoSampleResponse>{
        hypothesis: {leftSampleSize: 0, rightSampleSize: 0},
        alternative: {leftSampleSize: 0, rightSampleSize: 0},
        max: {leftSampleSize: 0, rightSampleSize: 0},
      })
    }
    return this.twoSampleCalculationService.calculateBinary(this.form.value)
  }

  getSuitableCalculationContent() {
    return getCalculationContent(this.lastAppliedResult!)
  }

  override getSuitableHintContent(): HintContentParams {
    return getSuitableHintContent(BinarySampleType.BINARY, this.form.get('alternative')?.value, this.hints)
  }

  protected getCalculationParams(response: CalculateTwoSampleResponse): TwoSampleStandardCalculationResultParams {
    return {
      p0: this.form.get('p')?.value,
      mde: this.form.get('mde')?.value,
      alpha: this.form.get('alpha')?.value,
      beta: this.form.get('beta')?.value,
      alternative: this.form.get('alternative')?.value,
      calcResult: response,
    }
  }

  protected override getLinkParams() {
    return {
      p: this.lastAppliedResult?.p0,
      mde: this.lastAppliedResult?.mde,
      alpha: this.lastAppliedResult?.alpha,
      beta: this.lastAppliedResult?.beta,
      alternative: this.lastAppliedResult?.alternative,
    }
  }

  protected override targetName(): string {
    return "TWO_SAMPLE";
  }
}
