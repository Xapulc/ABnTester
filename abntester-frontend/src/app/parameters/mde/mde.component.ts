import {Component, Input} from '@angular/core';
import {
  DefaultFormControlValueAccessorComponent,
} from '../../utils/default-form-control-value-accessor/default-form-control-value-accessor.component';
import {FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

@Component({
  selector: 'mde-param',
  templateUrl: './mde.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MdeComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: MdeComponent,
    },
  ],
})
export class MdeComponent extends DefaultFormControlValueAccessorComponent {

  form = new FormControl(1, [Validators.required, Validators.min(0.00001)]);

  @Input() isPercent: boolean = false

  get postfix() {
    return this.isPercent ? '%' : ''
  }

}
