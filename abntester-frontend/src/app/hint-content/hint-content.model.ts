import {BinarySampleType} from '../parameters/is-binary-radio/is-binary-radio.model';
import {OneTwoSidedAlternativeType} from '../parameters/one-two-sided-alternative/one-two-sided-alternative.model';

export interface HintContentModel {
  alternative: OneTwoSidedAlternativeType,
  type: BinarySampleType,
  params: HintContentParams
}

export interface HintContentParams {
  alpha: string
  beta: string
}
