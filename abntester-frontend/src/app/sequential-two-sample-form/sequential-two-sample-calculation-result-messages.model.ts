import {StandardCalculationContent} from '../standard-calculation-result/standard-calculation-result.model';
import {OneTwoSidedAlternativeType} from '../parameters/one-two-sided-alternative/one-two-sided-alternative.model';


export interface TwoSampleStandardCalculationResultParams {
  p0: number,
  mde: number,
  alpha: number,
  beta: number,
  firstSampleSize: number,
  secondSampleSize: number,
  alternative: OneTwoSidedAlternativeType,
}

export function getCalculationContent(params: TwoSampleStandardCalculationResultParams) {
  switch (params.alternative) {
    case OneTwoSidedAlternativeType.LEFT_SIDED:
      return binaryLeftSidedCalculationContent(params)
    case OneTwoSidedAlternativeType.RIGHT_SIDED:
      return binaryRightSidedCalculationContent(params)
    case OneTwoSidedAlternativeType.TWO_SIDED:
      return binaryTwoSidedCalculationContent(params)
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


first_success_cnt =  # количество успешных реализаций в первой выборке
first_sample_size =  # размер первой выборки
first_conv = first_success_cnt / first_sample_size

second_success_cnt =  # количество успешных реализаций во второй выборке
second_sample_size =  # размер второй выборки
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


first_success_cnt =  # количество успешных реализаций в первой выборке
first_sample_size =  # размер первой выборки
first_conv = first_success_cnt / first_sample_size

second_success_cnt =  # количество успешных реализаций во второй выборке
second_sample_size =  # размер второй выборки
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


first_success_cnt =  # количество успешных реализаций в первой выборке
first_sample_size =  # размер первой выборки
first_conv = first_success_cnt / first_sample_size

second_success_cnt =  # количество успешных реализаций во второй выборке
second_sample_size =  # размер второй выборки
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