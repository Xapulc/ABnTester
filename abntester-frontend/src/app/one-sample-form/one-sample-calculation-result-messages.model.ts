import {StandardCalculationContent} from '../standard-calculation-result/standard-calculation-result.model';
import {OneTwoSidedAlternativeType} from '../parameters/one-two-sided-alternative/one-two-sided-alternative.model';
import {BinarySampleType} from '../parameters/is-binary-radio/is-binary-radio.model';
import Decimal from 'decimal.js';


export interface OneSampleStandardCalculationResultParams {
  p0: number,
  mde: number,
  alpha: number,
  beta: number,
  sampleSize: number,
  alternative: OneTwoSidedAlternativeType,
  type: BinarySampleType,
}

export function getCalculationContent(params: OneSampleStandardCalculationResultParams) {
  switch (params.type) {
    case BinarySampleType.BINARY:
      switch (params.alternative) {
        case OneTwoSidedAlternativeType.LEFT_SIDED:
          return binaryLeftSidedCalculationContent(params)
      }
  }
  return defaultEmptyContent(params.sampleSize)
}

export function defaultEmptyContent(sampleSize: number): StandardCalculationContent {
  return {code: '', description: `Размер выборки: ${sampleSize}`}
}


function binaryLeftSidedCalculationContent(params: OneSampleStandardCalculationResultParams): StandardCalculationContent {
  const p0_mde = new Decimal(params.p0).minus(new Decimal(params.mde)).toNumber()
  return {
    description: `
      <h1>Постановка задачи</h1>
      Мы проверяем гипотезу, что на тесте конверсия $p$ не меньше $${params.p0}\\%$ против альтернативы, что конверсия $p$ меньше $${params.p0}\\%$.
      <h1>Размер выборки</h1>
      Для проведения теста нужно
      <h3><span style="font-size: 150%">${params.sampleSize}</span> клиентов</h3>
      При таком размере выборки:
      <br/><br/>
      <ul class="tui-list">
      <li class="tui-list__item"> если реальная конверсия $p$ не меньше $${params.p0}\\%$, то вероятность ошибки будет не более $${params.alpha}\\%$,</li>
      <li class="tui-list__item"> если реальная конверсия $p$ не больше $${p0_mde}\\%$, то вероятность ошибки будет не более $${params.beta}\\%$.</li>
      </ul>
      <h1>Критерий</h1>`,
    code: `from statsmodels.stats.proportion import proportions_ztest


success_cnt = \<количество успешных реализаций\>
sample_size = \<размер полученной выборки\>

# Базовая конверсия
p0 = ${params.p0} / 100
p = success_cnt / sample_size
alpha = ${params.alpha} / 100

res = proportions_ztest(success_cnt,
                        sample_size,
                        p0,
                        alternative="smaller")        # Левосторонняя альтернатива
pvalue = res[1]                                       # P-value критерия
print(f"P-value критерия = {pvalue}")

if pvalue < alpha:
    print(f"Конверсия {p:%} стат. значимо ниже базовой конверсии {p0:%}")
else:
    print(f"Конверсия {p:%} не стат. значимо ниже базовой конверсии {p0:%}")`,
  }
}
