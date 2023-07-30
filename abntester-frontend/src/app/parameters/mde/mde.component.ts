import {Component, Input} from '@angular/core';
import {
  DefaultFormControlValueAccessorComponent,
} from '../../utils/default-form-control-value-accessor/default-form-control-value-accessor.component';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'mde-param',
  templateUrl: './mde.component.html',
})
export class MdeComponent extends DefaultFormControlValueAccessorComponent {

  form = new FormControl(1, Validators.required);

  @Input() isPercent: boolean = false

  get postfix() {
    return this.isPercent ? '%' : ''
  }

}
