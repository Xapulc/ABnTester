import {StandardCalculationContent} from '../standard-calculation-result/standard-calculation-result.model';
import {OneTwoSidedAlternativeType} from '../parameters/one-two-sided-alternative/one-two-sided-alternative.model';
import Decimal from 'decimal.js';


export interface OneSampleStandardCalculationResultParams {
  p0: number,
  mde: number,
  alpha: number,
  beta: number,
  sampleSize: number,
  alternative: OneTwoSidedAlternativeType,
}

export function getCalculationContent(params: OneSampleStandardCalculationResultParams) {
  switch (params.alternative) {
    case OneTwoSidedAlternativeType.LEFT_SIDED:
      return binaryLeftSidedCalculationContent(params)
    case OneTwoSidedAlternativeType.RIGHT_SIDED:
      return binaryRightSidedCalculationContent(params)
    case OneTwoSidedAlternativeType.TWO_SIDED:
      return binaryTwoSidedCalculationContent(params)
  }
}

function binaryLeftSidedCalculationContent(params: OneSampleStandardCalculationResultParams): StandardCalculationContent {
  const p0_mde = new Decimal(params.p0).minus(new Decimal(params.mde)).toNumber()
  return {
    description: `
      <h1>Постановка задачи</h1>
      Мы проверяем гипотезу, что на тесте конверсия $p$ не меньше $${params.p0}\\%$, против альтернативы, что конверсия $p$ не больше $${p0_mde}\\%$.
      <h1>Размер выборки</h1>
      При использовании последовательного анализа <b>не нужно определять заранее размер выборки</b>.
      В момент остановки теста:
      <ul class="tui-list">
      <li class="tui-list__item"> если реальная конверсия $p$ не меньше $${params.p0}\\%$, то вероятность ошибки будет не более $${params.alpha}\\%$,</li>
      <li class="tui-list__item"> если реальная конверсия $p$ не больше $${p0_mde}\\%$, то вероятность ошибки будет не более $${params.beta}\\%$.</li>
      </ul>
      <br/>
      Можно оценить средний размер выборки до остановки теста.
      Он будет зависеть от истинного значения конверсии $p$:
      <ul class="tui-list">
      <li class="tui-list__item"> если реальная конверсия $p$ не меньше $${params.p0}\\%$, то средний размер выборки не превышает <b><span style="font-size: 150%">${params.sampleSize}</span></b>,</li>
      <li class="tui-list__item"> если реальная конверсия $p$ не больше $${p0_mde}\\%$, то средний размер выборки не превышает <b><span style="font-size: 150%">${params.sampleSize}</span></b>,</li>
      <li class="tui-list__item"> в худшем случае средний размер выборки будет равен <b><span style="font-size: 150%">${params.sampleSize}</span></b>.</li>
      </ul>
      <h1>Критерий</h1>
      Последовательный анализ реализован в <a href="https://colab.research.google.com/drive/1CF1EJwnn3A2z6XevgACWvqRZNWihJCHv#scrollTo=Jt7ub51xJ-Zy&line=12&uniqifier=1"> colab блокноте</a>.
      Им можно воспользоваться с помощью следующего кода.`,
    code: `p0 = ${params.p0} / 100
d = ${params.mde} / 100
alpha = ${params.alpha} / 100
beta = ${params.beta} / 100

# Класс последовательного анализа
sprt = BinaryOneSampleSprt(p0, d, alpha, beta,
                           alternative="less")

# Можно добавлять по одноме элементу с помощью метода sprt.append
# или добавлять сразу всю выборку с помощью sprt.append_list`,
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


success_cnt =  # количество успешных реализаций
sample_size =  # размер полученной выборки

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


success_cnt =  # количество успешных реализаций
sample_size =  # размер полученной выборки

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
