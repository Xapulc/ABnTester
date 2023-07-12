import {HintContentModel, HintContentParams} from './hint-content.model';
import {OneTwoSidedAlternativeType} from '../parameters/one-two-sided-alternative/one-two-sided-alternative.model';
import {BinarySampleType} from '../parameters/is-binary-radio/is-binary-radio.model';


export function getSuitableHintContent(sampleType: BinarySampleType,
                                       alternative: OneTwoSidedAlternativeType,
                                       hintMessages: HintContentModel[]): HintContentParams {
  const foundParams = hintMessages.find(it => it.alternative === alternative && it.type === sampleType)?.params
  return foundParams ? foundParams : defaultEmptyParams()
}


function defaultEmptyParams(): HintContentParams {
  return {
    alpha: '',
    beta: '',
    mde: '',
    probability: '',
    variance: '',
  }
}
