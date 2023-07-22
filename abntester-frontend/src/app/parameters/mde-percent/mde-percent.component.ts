import {Component} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {
  DefaultFormControlValueAccessorComponent,
} from '../../utils/default-form-control-value-accessor/default-form-control-value-accessor.component';

@Component({
  selector: 'mde-percent-param',
  templateUrl: './mde-percent.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MdePercentComponent,
    },
  ],
})
export class MdePercentComponent extends DefaultFormControlValueAccessorComponent {

  form = new FormControl(1, Validators.required)

}
