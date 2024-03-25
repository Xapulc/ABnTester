import Decimal from 'decimal.js';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {BinarySampleType} from '../../parameters/is-binary-radio/is-binary-radio.model';
import {OneTwoSidedAlternativeType} from "../../parameters/one-two-sided-alternative/one-two-sided-alternative.model";

const ONE_HUNDRED = new Decimal(100)

export const binaryMdeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (control.get('type')?.value != BinarySampleType.BINARY) {
    return null
  }
  const alternative = control.get('alternative')?.value
  const mde = control.get('mde')?.value
  const p = control.get('p')?.value
  if (mde == null || p == null) {
    return null
  }
  if (alternative != OneTwoSidedAlternativeType.RIGHT_SIDED && mde >= p) {
    return {'mdeMoreThanP': 'Не выполнено условие: mde < p'}
  }
  if (alternative != OneTwoSidedAlternativeType.LEFT_SIDED
    && new Decimal(mde).comparedTo(ONE_HUNDRED.minus(new Decimal(p))) >= 0) {
    return {'mdeMoreThan1MinusP': 'Не выполнено условие: mde < (1 - p)'}
  }
  return null
}
