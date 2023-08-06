import {Component} from '@angular/core';
import {FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {
  DefaultFormControlValueAccessorComponent,
} from '../../utils/default-form-control-value-accessor/default-form-control-value-accessor.component';

@Component({
  selector: 'one-two-sided-alternative-param',
  templateUrl: './one-two-sided-alternative.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: OneTwoSidedAlternativeComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: OneTwoSidedAlternativeComponent,
    },
  ],
})
export class OneTwoSidedAlternativeComponent extends DefaultFormControlValueAccessorComponent {

  form = new FormControl('RIGHT_SIDED', Validators.required)

}
