import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import Decimal from 'decimal.js';


const ONE_HUNDRED = new Decimal(100)

export const aplhaPlusBetaValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const alphaValue = control.get("alpha")?.value
  const betaValue = control.get("beta")?.value
  if (alphaValue == null || betaValue == null || alphaAndBetaLess100(alphaValue, betaValue)) {
    return null
  }
  return {
    'alphaAndBetaMore100': 'Не выполнено условие: alpha + beta < 100%',
  };
}

function alphaAndBetaLess100(alpha: number, beta: number): boolean {
  return new Decimal(alpha).plus(new Decimal(beta)).comparedTo(ONE_HUNDRED) < 0
}
