import {Component} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
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
  ],
})
export class ProbabilityComponent extends DefaultFormControlValueAccessorComponent {

  form = new FormControl(5, Validators.required)

}
