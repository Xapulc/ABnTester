import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OneSampleCalculationService} from './sequential-one-sample-calculation.service';
import {CalculateOneSampleResponse} from './sequential-one-sample-form-model';
import {oneSampleHints} from './sequential-one-sample-hint-messages.model';
import {StandardCalculationContent} from '../standard-calculation-result/standard-calculation-result.model';
import {
  getCalculationContent,
  OneSampleStandardCalculationResultParams,
} from './sequential-one-sample-calculation-result-messages.model';
import {BaseCalculationFormComponent} from '../utils/base-calculation-form/base-calculation-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Clipboard} from '@angular/cdk/clipboard';
import {TuiAlertService} from '@taiga-ui/core';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {aplhaPlusBetaValidator} from '../utils/validator/alpha-beta-validator';
import {binaryMdeValidator} from '../utils/validator/binary-mde-validator';
import {HintContentParams} from "../hint-content/hint-content.model";
import {BinarySampleType} from "../parameters/is-binary-radio/is-binary-radio.model";
import { getSuitableHintContent } from '../hint-content/hint-content.utils';

@Component({
  selector: 'app-sequential-one-sample-form',
  templateUrl: './sequential-one-sample-form.component.html',
})
export class SequentialOneSampleFormComponent extends BaseCalculationFormComponent<CalculateOneSampleResponse, OneSampleStandardCalculationResultParams> {

  constructor(override router: Router, override route: ActivatedRoute, private oneSampleCalculationService: OneSampleCalculationService,
              override clipboard: Clipboard, @Inject(TuiAlertService) override readonly alerts: TuiAlertService,
              override location: Location) {
    super(router, route, clipboard, alerts, location)
  }

  typeForm = new FormControl({value: 'BINARY', disabled: true})

  form: FormGroup = new FormGroup({
    alpha: new FormControl(5, Validators.required),
    beta: new FormControl(20, Validators.required),
    mde: new FormControl(1, Validators.required),
    p: new FormControl(10, Validators.required),
    alternative: new FormControl('RIGHT_SIDED', Validators.required),
  }, [aplhaPlusBetaValidator, binaryMdeValidator]);
  hints = oneSampleHints

  calculate(): Observable<CalculateOneSampleResponse> {
    return this.oneSampleCalculationService.calculateBinary(this.form.value)
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

  override getSuitableHintContent(): HintContentParams {
    return getSuitableHintContent(BinarySampleType.BINARY, this.form.get('alternative')?.value, this.hints)
  }

  protected override targetName(): string {
    return "SEQUENTIAL_ONE_SAMPLE";
  }
}
