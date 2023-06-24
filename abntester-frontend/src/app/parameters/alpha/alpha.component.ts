import {Component} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {
  DefaultFormControlValueAccessorComponent,
} from '../../utils/default-form-control-value-accessor/default-form-control-value-accessor.component';

@Component({
  selector: 'alpha-param',
  templateUrl: './alpha.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AlphaComponent,
    },
  ],
})
export class AlphaComponent extends DefaultFormControlValueAccessorComponent {

  form: FormControl = new FormControl(5, Validators.required)

}
