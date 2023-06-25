import {Component} from '@angular/core';
import {
  DefaultFormControlValueAccessorComponent,
} from '../../utils/default-form-control-value-accessor/default-form-control-value-accessor.component';
import {FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

@Component({
  selector: 'mde-abs-param',
  templateUrl: './mde-abs.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MdeAbsComponent,
    },
  ],
})
export class MdeAbsComponent extends DefaultFormControlValueAccessorComponent {

  form = new FormControl(10, Validators.required)

}
