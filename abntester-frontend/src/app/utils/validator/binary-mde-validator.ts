import Decimal from 'decimal.js';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {BinarySampleType} from '../../parameters/is-binary-radio/is-binary-radio.model';

const ONE_HUNDRED = new Decimal(100)

export const binaryMdeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (control.get('type')?.value != BinarySampleType.BINARY) {
    return null
  }
  const mde = control.get('mde')?.value
  const p = control.get('p')?.value
  if (mde == null || p == null) {
    return null
  }
  if (mde >= p) {
    return {'mdeMoreThanP': 'Не выполнено условие: mde < p'}
  }
  if (new Decimal(mde).comparedTo(ONE_HUNDRED.minus(new Decimal(p))) >= 0) {
    return {'mdeMoreThan1MinusP': 'Не выполнено условие: mde < (1 - p)'}
  }
  return null
}
