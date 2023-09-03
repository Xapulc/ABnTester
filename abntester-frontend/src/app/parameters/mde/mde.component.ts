import {Component, Input, OnInit} from '@angular/core';
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
export class MdeComponent extends DefaultFormControlValueAccessorComponent implements OnInit {

  form = new FormControl(1, [Validators.required, Validators.min(0.00001)]);

  @Input() isPercent: boolean = false

  override ngOnInit() {
    super.ngOnInit();
    if (this.isPercent) {
      this.form.addValidators(Validators.max(100))
    }
  }

  get postfix() {
    return this.isPercent ? '%' : ''
  }

}
