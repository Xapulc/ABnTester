import {Component} from '@angular/core';
import {FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {
  DefaultFormControlValueAccessorComponent,
} from '../../utils/default-form-control-value-accessor/default-form-control-value-accessor.component';

@Component({
  selector: 'variance-param',
  templateUrl: './variance.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: VarianceComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: VarianceComponent,
    },
  ],
})
export class VarianceComponent extends DefaultFormControlValueAccessorComponent {

  form = new FormControl(100, [Validators.required, Validators.min(0.000001)])

}
