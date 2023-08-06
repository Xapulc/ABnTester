import {Component} from '@angular/core';
import {FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {
  DefaultFormControlValueAccessorComponent,
} from '../../utils/default-form-control-value-accessor/default-form-control-value-accessor.component';

@Component({
  selector: 'probability-param',
  templateUrl: './probability.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ProbabilityComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ProbabilityComponent,
    },
  ],
})
export class ProbabilityComponent extends DefaultFormControlValueAccessorComponent {

  form = new FormControl(10, [Validators.required, Validators.min(0.01), Validators.max(99.99)])

}
