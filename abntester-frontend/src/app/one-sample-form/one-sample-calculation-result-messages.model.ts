import {StandardCalculationContent} from '../standard-calculation-result/standard-calculation-result.model';
import {OneTwoSidedAlternativeType} from '../parameters/one-two-sided-alternative/one-two-sided-alternative.model';
import {BinarySampleType} from '../parameters/is-binary-radio/is-binary-radio.model';
import Decimal from 'decimal.js';


export interface OneSampleStandardCalculationResultParams {
  p0: number,
  mde: number,
  variance: number,
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
      Мы проверяем гипотезу, что на тесте конверсия $p$ не меньше $${params.p0}\\%$, против альтернативы, что конверсия $p$ меньше $${params.p0}\\%$.
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
    code: `from scipy.stats import binomtest


success_cnt = \<количество успешных реализаций\>
sample_size = \<размер полученной выборки\>

# Базовая конверсия
p0 = ${params.p0} / 100
p = success_cnt / sample_size
alpha = ${params.alpha} / 100

# Используем критерий с левосторонней альтернативой
res = binomtest(success_cnt,
                sample_size,
                p=p0,
                alternative="less")
pvalue = res.pvalue
print(f"P-value критерия = {pvalue}.")

if pvalue < alpha:
    print(f"Конверсия {p:%} стат. значимо ниже базовой конверсии {p0:%}.")
else:
    print(f"Конверсия {p:%} не стат. значимо ниже базовой конверсии {p0:%}.")`,
  }
}


function binaryRightSidedCalculationContent(params: OneSampleStandardCalculationResultParams): StandardCalculationContent {
  const p0_mde = new Decimal(params.p0).plus(new Decimal(params.mde)).toNumber()
  return {
    description: `
      <h1>Постановка задачи</h1>
      Мы проверяем гипотезу, что на тесте конверсия $p$ не превосходит $${params.p0}\\%$, против альтернативы, что конверсия $p$ больше $${params.p0}\\%$.
      <h1>Размер выборки</h1>
      Для проведения теста нужно
      <h3><span style="font-size: 150%">${params.sampleSize}</span> клиентов</h3>
      При таком размере выборки:
      <br/><br/>
      <ul class="tui-list">
      <li class="tui-list__item"> если реальная конверсия $p$ не больше $${params.p0}\\%$, то вероятность ошибки будет не более $${params.alpha}\\%$,</li>
      <li class="tui-list__item"> если реальная конверсия $p$ не меньше $${p0_mde}\\%$, то вероятность ошибки будет не более $${params.beta}\\%$.</li>
      </ul>
      <h1>Критерий</h1>`,
    code: `from scipy.stats import binomtest


success_cnt = \<количество успешных реализаций\>
sample_size = \<размер полученной выборки\>

# Базовая конверсия
p0 = ${params.p0} / 100
p = success_cnt / sample_size
alpha = ${params.alpha} / 100

# Используем критерий с правосторонней альтернативой
res = binomtest(success_cnt,
                sample_size,
                p=p0,
                alternative="greater")
pvalue = res.pvalue
print(f"P-value критерия = {pvalue}.")

if pvalue < alpha:
    print(f"Конверсия {p:%} стат. значимо больше базовой конверсии {p0:%}.")
else:
    print(f"Конверсия {p:%} не стат. значимо больше базовой конверсии {p0:%}.")`,
  }
}


function binaryTwoSidedCalculationContent(params: OneSampleStandardCalculationResultParams): StandardCalculationContent {
  return {
    description: `
      <h1>Постановка задачи</h1>
      Мы проверяем гипотезу, что на тесте конверсия $p$ равна $${params.p0}\\%$, против альтернативы, что конверсия $p$ отличается от $${params.p0}\\%$.
      <h1>Размер выборки</h1>
      Для проведения теста нужно
      <h3><span style="font-size: 150%">${params.sampleSize}</span> клиентов</h3>
      При таком размере выборки:
      <br/><br/>
      <ul class="tui-list">
      <li class="tui-list__item"> если реальная конверсия $p$ равна $${params.p0}\\%$, то вероятность ошибки будет не более $${params.alpha}\\%$,</li>
      <li class="tui-list__item"> если реальная конверсия $p$ отличается от $${params.p0}\\%$ хотя бы на $${params.mde}\\%$, то вероятность ошибки будет не более $${params.beta}\\%$.</li>
      </ul>
      <h1>Критерий</h1>`,
    code: `from scipy.stats import binomtest


success_cnt = \<количество успешных реализаций\>
sample_size = \<размер полученной выборки\>

# Базовая конверсия
p0 = ${params.p0} / 100
p = success_cnt / sample_size
alpha = ${params.alpha} / 100

# Используем критерий с двусторонней альтернативой
res = binomtest(success_cnt,
                sample_size,
                p=p0,
                alternative="two-sided")
pvalue = res.pvalue
print(f"P-value критерия = {pvalue}.")

if pvalue < alpha:
    if p > p0:
        print(f"Конверсия {p:%} стат. значимо больше базовой конверсии {p0:%}.")
    else:
        print(f"Конверсия {p:%} стат. значимо меньше базовой конверсии {p0:%}.")
else:
    print(f"Конверсия {p:%} не стат. значимо отличается базовой конверсии {p0:%}.")`,
  }
}


function nonBinaryLeftSidedCalculationContent(params: OneSampleStandardCalculationResultParams): StandardCalculationContent {
  return {
    description: `
      <h1>Постановка задачи</h1>
      Пусть $\\mu_0$ - целевое значение, с которым мы хотим сравнить $\\mu$ - мат. ожидание целевой метрики теста.
      Мы проверяем гипотезу $\\mu \\geq \\mu_0$ против альтернативы $\\mu \< \\mu_0$.
      <h1>Размер выборки</h1>
      Для проведения теста нужно
      <h3><span style="font-size: 150%">${params.sampleSize}</span> клиентов</h3>
      При таком размере выборки:
      <br/><br/>
      <ul class="tui-list">
      <li class="tui-list__item"> если мат. ожидание $\\mu$ не меньше целевого значения $\\mu_0$, то вероятность ошибки будет не более $${params.alpha}\\%$,</li>
      <li class="tui-list__item"> если мат. ожидание $\\mu$ не больше $\\mu_0 - \\text{MDE}$ и дисперсия метрики не превышает $${params.variance}$, то вероятность ошибки будет не более $${params.beta}\\%$.</li>
      </ul>
      <h1>Критерий</h1>`,
    code: `import numpy as np

from statsmodels.stats.weightstats import ztest


sample = \<значения целевой метрики на выборке клиентов\>
mu0 =    \<целевое значение метрики\>
mu = np.mean(sample)
alpha = ${params.alpha} / 100

# Используем критерий с левосторонней альтернативой
res = ztest(sample,
            value=mu0,
            alternative="smaller")
pvalue = res[1]
print(f"P-value критерия = {pvalue}.")

if pvalue < alpha:
    print(f"Среднее метрики {mu} стат. значимо ниже значения {mu0}.")
else:
    print(f"Среднее метрики {mu} не стат. значимо ниже значения {mu0}.")`,
  }
}


function nonBinaryRightSidedCalculationContent(params: OneSampleStandardCalculationResultParams): StandardCalculationContent {
  return {
    description: `
      <h1>Постановка задачи</h1>
      Пусть $\\mu_0$ - целевое значение, с которым мы хотим сравнить $\\mu$ - мат. ожидание целевой метрики теста.
      Мы проверяем гипотезу $\\mu \\leq \\mu_0$ против альтернативы $\\mu \> \\mu_0$.
      <h1>Размер выборки</h1>
      Для проведения теста нужно
      <h3><span style="font-size: 150%">${params.sampleSize}</span> клиентов</h3>
      При таком размере выборки:
      <br/><br/>
      <ul class="tui-list">
      <li class="tui-list__item"> если мат. ожидание $\\mu$ не больше целевого значения $\\mu_0$, то вероятность ошибки будет не более $${params.alpha}\\%$,</li>
      <li class="tui-list__item"> если мат. ожидание $\\mu$ не меньше $\\mu_0 + \\text{MDE}$ и дисперсия метрики не превышает $${params.variance}$, то вероятность ошибки будет не более $${params.beta}\\%$.</li>
      </ul>
      <h1>Критерий</h1>`,
    code: `import numpy as np

from statsmodels.stats.weightstats import ztest


sample = \<значения целевой метрики на выборке клиентов\>
mu0 =    \<целевое значение метрики\>
mu = np.mean(sample)
alpha = ${params.alpha} / 100

# Используем критерий с правосторонней альтернативой
res = ztest(sample,
            value=mu0,
            alternative="larger")
pvalue = res[1]
print(f"P-value критерия = {pvalue}.")

if pvalue < alpha:
    print(f"Среднее метрики {mu} стат. значимо выше значения {mu0}.")
else:
    print(f"Среднее метрики {mu} не стат. значимо выше значения {mu0}.")`,
  }
}


function nonBinaryTwoSidedCalculationContent(params: OneSampleStandardCalculationResultParams): StandardCalculationContent {
  return {
    description: `
      <h1>Постановка задачи</h1>
      Пусть $\\mu_0$ - целевое значение, с которым мы хотим сравнить $\\mu$ - мат. ожидание целевой метрики теста.
      Мы проверяем гипотезу $\\mu = \\mu_0$ против альтернативы $\\mu \\neq \\mu_0$.
      <h1>Размер выборки</h1>
      Для проведения теста нужно
      <h3><span style="font-size: 150%">${params.sampleSize}</span> клиентов</h3>
      При таком размере выборки:
      <br/><br/>
      <ul class="tui-list">
      <li class="tui-list__item"> если мат. ожидание $\\mu$ совпадает с целевым значением $\\mu_0$, то вероятность ошибки будет не более $${params.alpha}\\%$,</li>
      <li class="tui-list__item"> если мат. ожидание $\\mu$ отличается от $\\mu_0$ как минимум на $\\text{MDE}$ и дисперсия метрики не превышает $${params.variance}$, то вероятность ошибки будет не более $${params.beta}\\%$.</li>
      </ul>
      <h1>Критерий</h1>`,
    code: `import numpy as np

from statsmodels.stats.weightstats import ztest


sample = \<значения целевой метрики на выборке клиентов\>
mu0 =    \<целевое значение метрики\>
mu = np.mean(sample)
alpha = ${params.alpha} / 100

# Используем критерий с двусторонней альтернативой
res = ztest(sample,
            value=mu0,
            alternative="two-sided")
pvalue = res[1]
print(f"P-value критерия = {pvalue}.")

if pvalue < alpha:
    if mu > mu0:
        print(f"Среднее метрики {mu} стат. значимо выше значения {mu0}.")
    else:
        print(f"Среднее метрики {mu} стат. значимо ниже значения {mu0}.")
else:
    print(f"Среднее метрики {mu} не стат. значимо отличается от значения {mu0}.")`,
  }
}
