import {Component} from '@angular/core';
import {FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {
  DefaultFormControlValueAccessorComponent,
} from '../../utils/default-form-control-value-accessor/default-form-control-value-accessor.component';

@Component({
  selector: 'beta-param',
  templateUrl: './beta.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: BetaComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: BetaComponent,
    },
  ],
})
export class BetaComponent extends DefaultFormControlValueAccessorComponent {

  form: FormControl = new FormControl(20, [Validators.required, Validators.min(0.01), Validators.max(99.99)])

}
