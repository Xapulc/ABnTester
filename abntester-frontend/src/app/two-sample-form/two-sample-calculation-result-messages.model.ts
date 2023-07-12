import {StandardCalculationContent} from '../standard-calculation-result/standard-calculation-result.model';
import {OneTwoSidedAlternativeType} from '../parameters/one-two-sided-alternative/one-two-sided-alternative.model';
import {BinarySampleType} from '../parameters/is-binary-radio/is-binary-radio.model';
import Decimal from 'decimal.js';


export interface TwoSampleStandardCalculationResultParams {
  p0: number,
  mde: number,
  variance: number,
  alpha: number,
  beta: number,
  firstSampleSize: number,
  secondSampleSize: number,
  alternative: OneTwoSidedAlternativeType,
  type: BinarySampleType,
}

export function getCalculationContent(params: TwoSampleStandardCalculationResultParams) {
  switch (params.type) {
    case BinarySampleType.BINARY:
      switch (params.alternative) {
        case OneTwoSidedAlternativeType.LEFT_SIDED:
          return binaryLeftSidedCalculationContent(params)
        case OneTwoSidedAlternativeType.RIGHT_SIDED:
          return binaryRightSidedCalculationContent(params)
        case OneTwoSidedAlternativeType.TWO_SIDED:
          return binaryTwoSidedCalculationContent(params)
      }
    case BinarySampleType.NON_BINARY:
      switch (params.alternative) {
        case OneTwoSidedAlternativeType.LEFT_SIDED:
          return nonBinaryLeftSidedCalculationContent(params)
        case OneTwoSidedAlternativeType.RIGHT_SIDED:
          return nonBinaryRightSidedCalculationContent(params)
        case OneTwoSidedAlternativeType.TWO_SIDED:
          return nonBinaryTwoSidedCalculationContent(params)
      }
  }
  return defaultEmptyContent(params.firstSampleSize, params.secondSampleSize)
}

export function defaultEmptyContent(firstSampleSize: number, secondSampleSize: number): StandardCalculationContent {
  return {
    code: '',
    description: `Размер первой выборки: ${firstSampleSize}</br>Размер второй выборки: ${secondSampleSize}`,
  }
}


function binaryLeftSidedCalculationContent(params: TwoSampleStandardCalculationResultParams): StandardCalculationContent {
  return {
    description: `Размер первой выборки: ${params.firstSampleSize}</br>Размер второй выборки:${params.secondSampleSize}`,
    code: ``,
  }
}


function binaryRightSidedCalculationContent(params: TwoSampleStandardCalculationResultParams): StandardCalculationContent {
  return {
    description: `Размер первой выборки: ${params.firstSampleSize}</br>Размер второй выборки:${params.secondSampleSize}`,
    code: ``,
  }
}


function binaryTwoSidedCalculationContent(params: TwoSampleStandardCalculationResultParams): StandardCalculationContent {
  return {
    description: `Размер первой выборки: ${params.firstSampleSize}</br>Размер второй выборки:${params.secondSampleSize}`,
    code: ``,
  }
}


function nonBinaryLeftSidedCalculationContent(params: TwoSampleStandardCalculationResultParams): StandardCalculationContent {
  return {
    description: `Размер первой выборки: ${params.firstSampleSize}</br>Размер второй выборки:${params.secondSampleSize}`,
    code: ``,
  }
}


function nonBinaryRightSidedCalculationContent(params: TwoSampleStandardCalculationResultParams): StandardCalculationContent {
  return {
    description: `Размер первой выборки: ${params.firstSampleSize}</br>Размер второй выборки:${params.secondSampleSize}`,
    code: ``,
  }
}


function nonBinaryTwoSidedCalculationContent(params: TwoSampleStandardCalculationResultParams): StandardCalculationContent {
  return {
    description: `Размер первой выборки: ${params.firstSampleSize}</br>Размер второй выборки:${params.secondSampleSize}`,
    code: ``,
  }
}
