import {Component} from '@angular/core';
import {FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {
  DefaultFormControlValueAccessorComponent,
} from '../../utils/default-form-control-value-accessor/default-form-control-value-accessor.component';

@Component({
  selector: 'is-binary-radio-param',
  templateUrl: './is-binary-radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: IsBinaryRadioComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: IsBinaryRadioComponent,
    },
  ],
})
export class IsBinaryRadioComponent extends DefaultFormControlValueAccessorComponent {

  form = new FormControl('BINARY', Validators.required)

}
