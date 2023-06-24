import {Component} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {
  DefaultFormControlValueAccessorComponent,
} from '../../utils/default-form-control-value-accessor/default-form-control-value-accessor.component';

@Component({
  selector: 'mde-param',
  templateUrl: './mde.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MdeComponent,
    },
  ],
})
export class MdeComponent extends DefaultFormControlValueAccessorComponent {

  form = new FormControl(5, Validators.required)

}
