import {StandardCalculationContent} from '../standard-calculation-result/standard-calculation-result.model';
import {OneTwoSidedAlternativeType} from '../parameters/one-two-sided-alternative/one-two-sided-alternative.model';
import {BinarySampleType} from '../parameters/is-binary-radio/is-binary-radio.model';


export interface TwoSampleStandardCalculationResultParams {
  p0: number,
  mde: number,
  variance: number,
  alpha: number,
  beta: number,
  leftProportion: number,
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
    description: `
      <h1>Постановка задачи</h1>
      Пусть $p_1$ - вероятность успеха на первой выборке, $p_2$ - вероятность успеха на второй выборке.
      Мы проверяем гипотезу $p_1 \\leq p_2$ против альтернативы $p_1 \> p_2$.
      <h1>Размер выборки</h1>
      Для проведения теста нужно
      <h3><span style="font-size: 150%">${params.firstSampleSize}</span> клиентов на первую выборку,
      <span style="font-size: 150%">${params.secondSampleSize}</span> клиентов на вторую выборку</h3>
      При таком размере выборки:
      <br/><br/>
      <ul class="tui-list">
      <li class="tui-list__item"> если вероятность $p_1$ не больше $p_2$, то вероятность ошибки будет не более $${params.alpha}\\%$,</li>
      <li class="tui-list__item"> если вероятность $p_1$ не меньше $p_2 + \\text{MDE}$, то вероятность ошибки будет не более $${params.beta}\\%$.</li>
      </ul>
      <h1>Критерий</h1>`,
    code: `from statsmodels.stats.proportion import proportions_ztest


first_success_cnt =  <количество успешных реализаций в первой выборке>
first_sample_size =  <размер первой выборки>
first_conv = first_success_cnt / first_sample_size

second_success_cnt = <количество успешных реализаций во второй выборке>
second_sample_size = <размер второй выборки>
second_conv = second_success_cnt / second_sample_size

alpha = ${params.alpha} / 100

# Используем критерий с левосторонней альтернативой
res = proportions_ztest([first_success_cnt, second_success_cnt],
                        [first_sample_size, second_sample_size],
                        alternative="larger")
pvalue = res[1]
print(f"P-value критерия = {pvalue}.")

if pvalue < alpha:
    print(f"Конверсия {first_conv:%} на первой выборке стат. значимо больше "
          + f"конверсии {second_conv:%} на второй выборке.")
else:
    print(f"Конверсия {first_conv:%} на первой выборке не стат. значимо больше "
          + f"конверсии {second_conv:%} на второй выборке.")`,
  }
}


function binaryRightSidedCalculationContent(params: TwoSampleStandardCalculationResultParams): StandardCalculationContent {
  return {
    description: `
      <h1>Постановка задачи</h1>
      Пусть $p_1$ - вероятность успеха на первой выборке, $p_2$ - вероятность успеха на второй выборке.
      Мы проверяем гипотезу $p_1 \\geq p_2$ против альтернативы $p_1 \< p_2$.
      <h1>Размер выборки</h1>
      Для проведения теста нужно
      <h3><span style="font-size: 150%">${params.firstSampleSize}</span> клиентов на первую выборку,
      <span style="font-size: 150%">${params.secondSampleSize}</span> клиентов на вторую выборку</h3>
      При таком размере выборки:
      <br/><br/>
      <ul class="tui-list">
      <li class="tui-list__item"> если вероятность $p_1$ не меньше $p_2$, то вероятность ошибки будет не более $${params.alpha}\\%$,</li>
      <li class="tui-list__item"> если вероятность $p_1$ не больше $p_2 - \\text{MDE}$, то вероятность ошибки будет не более $${params.beta}\\%$.</li>
      </ul>
      <h1>Критерий</h1>`,
    code: `from statsmodels.stats.proportion import proportions_ztest


first_success_cnt =  <количество успешных реализаций в первой выборке>
first_sample_size =  <размер первой выборки>
first_conv = first_success_cnt / first_sample_size

second_success_cnt = <количество успешных реализаций во второй выборке>
second_sample_size = <размер второй выборки>
second_conv = second_success_cnt / second_sample_size

alpha = ${params.alpha} / 100

# Используем критерий с правосторонней альтернативой
res = proportions_ztest([first_success_cnt, second_success_cnt],
                        [first_sample_size, second_sample_size],
                        alternative="smaller")
pvalue = res[1]
print(f"P-value критерия = {pvalue}.")

if pvalue < alpha:
    print(f"Конверсия {first_conv:%} на первой выборке стат. значимо меньше "
          + f"конверсии {second_conv:%} на второй выборке.")
else:
    print(f"Конверсия {first_conv:%} на первой выборке не стат. значимо меньше "
          + f"конверсии {second_conv:%} на второй выборке.")`,
  }
}


function binaryTwoSidedCalculationContent(params: TwoSampleStandardCalculationResultParams): StandardCalculationContent {
  return {
    description: `
      <h1>Постановка задачи</h1>
      Пусть $p_1$ - вероятность успеха на первой выборке, $p_2$ - вероятность успеха на второй выборке.
      Мы проверяем гипотезу $p_1 = p_2$ против альтернативы $p_1 \\neq p_2$.
      <h1>Размер выборки</h1>
      Для проведения теста нужно
      <h3><span style="font-size: 150%">${params.firstSampleSize}</span> клиентов на первую выборку,
      <span style="font-size: 150%">${params.secondSampleSize}</span> клиентов на вторую выборку</h3>
      При таком размере выборки:
      <br/><br/>
      <ul class="tui-list">
      <li class="tui-list__item"> если вероятности $p_1$ и $p_2$ совпадают, то вероятность ошибки будет не более $${params.alpha}\\%$,</li>
      <li class="tui-list__item"> если вероятности $p_1$ и $p_2$ различаются как минимум на MDE, то вероятность ошибки будет не более $${params.beta}\\%$.</li>
      </ul>
      <h1>Критерий</h1>`,
    code: `from statsmodels.stats.proportion import proportions_ztest


first_success_cnt =  <количество успешных реализаций в первой выборке>
first_sample_size =  <размер первой выборки>
first_conv = first_success_cnt / first_sample_size

second_success_cnt = <количество успешных реализаций во второй выборке>
second_sample_size = <размер второй выборки>
second_conv = second_success_cnt / second_sample_size

alpha = ${params.alpha} / 100

# Используем критерий с двусторонней альтернативой
res = proportions_ztest([first_success_cnt, second_success_cnt],
                        [first_sample_size, second_sample_size],
                        alternative="two-sided")
pvalue = res[1]
print(f"P-value критерия = {pvalue}.")

if pvalue < alpha:
    if first_conv > second_conv:
        print(f"Конверсия {first_conv:%} на первой выборке стат. значимо больше "
              + f"конверсии {second_conv:%} на второй выборке.")
    else:
        print(f"Конверсия {first_conv:%} на первой выборке стат. значимо меньше "
              + f"конверсии {second_conv:%} на второй выборке.")
else:
    print(f"Конверсии {first_conv:%} и {second_conv:%} различаются не стат. значимо.")`,
  }
}


function nonBinaryLeftSidedCalculationContent(params: TwoSampleStandardCalculationResultParams): StandardCalculationContent {
  return {
    description: `
      <h1>Постановка задачи</h1>
      Пусть $\\mu_1$ - мат. ожидание целевой метрики теста в первой вариации, $\\mu_2$ - мат. ожидание во второй вариации.
      Мы проверяем гипотезу $\\mu_1 \\leq \\mu_2$ против альтернативы $\\mu_1 \> \\mu_2$.
      <h1>Размер выборки</h1>
      Для проведения теста нужно
      <h3><span style="font-size: 150%">${params.firstSampleSize}</span> клиентов на первую выборку,
      <span style="font-size: 150%">${params.secondSampleSize}</span> клиентов на вторую выборку</h3>
      При таком размере выборки:
      <br/><br/>
      <ul class="tui-list">
      <li class="tui-list__item"> если мат. ожидание $\\mu_1$ не больше $\\mu_2$, то вероятность ошибки будет не более $${params.alpha}\\%$,</li>
      <li class="tui-list__item"> если мат. ожидание $\\mu_1$ не меньше $\\mu_2 + \\text{MDE}$ и дисперсия метрик не превышает $${params.variance}$, то вероятность ошибки будет не более $${params.beta}\\%$.</li>
      </ul>
      <h1>Критерий</h1>`,
    code: `from scipy.stats import ttest_ind


first_sample =  <значения целевой метрики теста в первой вариации>
first_mean = np.mean(first_sample)

second_sample = <значения целевой метрики теста во второй вариации>
second_mean = np.mean(second_sample)

alpha = ${params.alpha} / 100

# Убираем предположение об одинаковости дисперсий в выборках
# Используем критерий с левосторонней альтернативой
res = ttest_ind(first_sample,
                second_sample,
                equal_var=False,
                alternative="greater")
pvalue = res.pvalue
print(f"P-value критерия = {pvalue}.")

if pvalue < alpha:
    print(f"Среднее {first_mean} метрики на первой выборке стат. значимо больше "
          + f"среднего {second_mean} на второй выборке.")
else:
    print(f"Среднее {first_mean} метрики на первой выборке не стат. значимо больше "
          + f"среднего {second_mean} на второй выборке.")`,
  }
}


function nonBinaryRightSidedCalculationContent(params: TwoSampleStandardCalculationResultParams): StandardCalculationContent {
  return {
    description: `
      <h1>Постановка задачи</h1>
      Пусть $\\mu_1$ - мат. ожидание целевой метрики теста в первой вариации, $\\mu_2$ - мат. ожидание во второй вариации.
      Мы проверяем гипотезу $\\mu_1 \\geq \\mu_2$ против альтернативы $\\mu_1 \< \\mu_2$.
      <h1>Размер выборки</h1>
      Для проведения теста нужно
      <h3><span style="font-size: 150%">${params.firstSampleSize}</span> клиентов на первую выборку,
      <span style="font-size: 150%">${params.secondSampleSize}</span> клиентов на вторую выборку</h3>
      При таком размере выборки:
      <br/><br/>
      <ul class="tui-list">
      <li class="tui-list__item"> если мат. ожидание $\\mu_1$ не меньше $\\mu_2$, то вероятность ошибки будет не более $${params.alpha}\\%$,</li>
      <li class="tui-list__item"> если мат. ожидание $\\mu_1$ не больше $\\mu_2 - \\text{MDE}$ и дисперсия метрик не превышает $${params.variance}$, то вероятность ошибки будет не более $${params.beta}\\%$.</li>
      </ul>
      <h1>Критерий</h1>`,
    code: `from scipy.stats import ttest_ind


first_sample =  <значения целевой метрики теста в первой вариации>
first_mean = np.mean(first_sample)

second_sample = <значения целевой метрики теста во второй вариации>
second_mean = np.mean(second_sample)

alpha = ${params.alpha} / 100

# Убираем предположение об одинаковости дисперсий в выборках
# Используем критерий с правосторонней альтернативой
res = ttest_ind(first_sample,
                second_sample,
                equal_var=False,
                alternative="less")
pvalue = res.pvalue
print(f"P-value критерия = {pvalue}.")

if pvalue < alpha:
    print(f"Среднее {first_mean} метрики на первой выборке стат. значимо меньше "
          + f"среднего {second_mean} на второй выборке.")
else:
    print(f"Среднее {first_mean} метрики на первой выборке не стат. значимо меньше "
          + f"среднего {second_mean} на второй выборке.")`,
  }
}


function nonBinaryTwoSidedCalculationContent(params: TwoSampleStandardCalculationResultParams): StandardCalculationContent {
  return {
    description: `
      <h1>Постановка задачи</h1>
      Пусть $\\mu_1$ - мат. ожидание целевой метрики теста в первой вариации, $\\mu_2$ - мат. ожидание во второй вариации.
      Мы проверяем гипотезу $\\mu_1 = \\mu_2$ против альтернативы $\\mu_1 \\neq \\mu_2$.
      <h1>Размер выборки</h1>
      Для проведения теста нужно
      <h3><span style="font-size: 150%">${params.firstSampleSize}</span> клиентов на первую выборку,
      <span style="font-size: 150%">${params.secondSampleSize}</span> клиентов на вторую выборку</h3>
      При таком размере выборки:
      <br/><br/>
      <ul class="tui-list">
      <li class="tui-list__item"> если мат. ожидания $\\mu_1$ и $\\mu_2$ совпадают, то вероятность ошибки будет не более $${params.alpha}\\%$,</li>
      <li class="tui-list__item"> если мат. ожидания $\\mu_1$ и $\\mu_2$ различаются хотя бы на MDE и дисперсия метрик не превышает $${params.variance}$, то вероятность ошибки будет не более $${params.beta}\\%$.</li>
      </ul>
      <h1>Критерий</h1>`,
    code: `from scipy.stats import ttest_ind


first_sample =  <значения целевой метрики теста в первой вариации>
first_mean = np.mean(first_sample)

second_sample = <значения целевой метрики теста во второй вариации>
second_mean = np.mean(second_sample)

alpha = ${params.alpha} / 100

# Убираем предположение об одинаковости дисперсий в выборках
# Используем критерий с двусторонней альтернативой
res = ttest_ind(first_sample,
                second_sample,
                equal_var=False,
                alternative="two-sided")
pvalue = res.pvalue
print(f"P-value критерия = {pvalue}.")

if pvalue < alpha:
    if first_mean > second_mean:
        print(f"Среднее {first_mean} метрики на первой выборке стат. значимо больше "
              + f"среднего {second_mean} на второй выборке.")
    else:
        print(f"Среднее {first_mean} метрики на первой выборке стат. значимо меньше "
              + f"среднего {second_mean} на второй выборке.")
else:
    print(f"Различие между средними {first_mean} и {second_mean} не является стат. значимым.")`,
  }
}
