import {StandardCalculationContent} from '../standard-calculation-result/standard-calculation-result.model';
import {OneTwoSidedAlternativeType} from '../parameters/one-two-sided-alternative/one-two-sided-alternative.model';
import {CalculateTwoSampleResponse} from './sequential-two-sample-form-model';


export interface TwoSampleStandardCalculationResultParams {
  p0: number,
  mde: number,
  alpha: number,
  beta: number,
  alternative: OneTwoSidedAlternativeType,
  calcResult: CalculateTwoSampleResponse
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
      Мы проверяем гипотезу $p_1 \\leq p_2$ против альтернативы $p_1 \\geq p_2 + \\text{MDE}$.
      <h1>Размер выборки</h1>
      При использовании последовательного анализа <b>не нужно определять заранее размер выборки</b>.
      В момент остановки теста:
      <ul class="tui-list">
      <li class="tui-list__item"> если вероятность $p_1$ не больше $p_2$, то вероятность ошибки будет не более $${params.alpha}\\%$,</li>
      <li class="tui-list__item"> если вероятность $p_1$ не меньше $p_2 + \\text{MDE}$, то вероятность ошибки будет не более $${params.beta}\\%$.</li>
      </ul>
      <br/>
      Можно оценить средний размер выборки до остановки теста.
      Он будет зависеть от истинного значения конверсии $p$:
      <ul class="tui-list">
      <li class="tui-list__item"> если вероятность $p_1$ не больше $p_2$,
      то средний размер первой и второй выборок не превышает
      <b><span style="font-size: 150%">${params.calcResult.hypothesis.leftSampleSize}</span></b>
      и <b><span style="font-size: 150%">${params.calcResult.hypothesis.rightSampleSize}</span></b>, соответственно,</li>
      <li class="tui-list__item"> если вероятность $p_1$ не меньше $p_2 + \\text{MDE}$,
      то средний размер первой и второй выборок не превышает
      <b><span style="font-size: 150%">${params.calcResult.alternative.leftSampleSize}</span></b>
      и <b><span style="font-size: 150%">${params.calcResult.alternative.rightSampleSize}</span></b>, соответственно,</li>
      <li class="tui-list__item"> в худшем случае средний размер первой и второй выборок будет равен
      <b><span style="font-size: 150%">${params.calcResult.max.leftSampleSize}</span></b>
      и <b><span style="font-size: 150%">${params.calcResult.max.rightSampleSize}</span></b>, соответственно.</li>
      </ul>
      <h1>Критерий</h1>
      Последовательный анализ реализован в <a href="https://colab.research.google.com/drive/1CF1EJwnn3A2z6XevgACWvqRZNWihJCHv#scrollTo=dbhDZhjXFRCd&line=4&uniqifier=1"> colab блокноте</a>.
      Им можно воспользоваться с помощью следующего кода.`,
    code: `p0 = ${params.p0} / 100
d = ${params.mde} / 100
alpha = ${params.alpha} / 100
beta = ${params.beta} / 100

# Класс последовательного анализа
sprt = BinaryTwoSampleSprt(p0, d, alpha, beta,
                           alternative="greater")

# Можно добавлять по одному элементу с помощью метода sprt.append
# или добавлять сразу всю выборку с помощью sprt.append_list
# Оба метода возвращают описание решения, которое следует принять:
# или продолжать тест, или завершать с определённым выводом`,
  }
}


function binaryRightSidedCalculationContent(params: TwoSampleStandardCalculationResultParams): StandardCalculationContent {
  return {
    description: `
      <h1>Постановка задачи</h1>
      Пусть $p_1$ - вероятность успеха на первой выборке, $p_2$ - вероятность успеха на второй выборке.
      Мы проверяем гипотезу $p_1 \\geq p_2$ против альтернативы $p_1 \\leq p_2 - \\text{MDE}$.
      <h1>Размер выборки</h1>
      При использовании последовательного анализа <b>не нужно определять заранее размер выборки</b>.
      В момент остановки теста:
      <ul class="tui-list">
      <li class="tui-list__item"> если вероятность $p_1$ не меньше $p_2$, то вероятность ошибки будет не более $${params.alpha}\\%$,</li>
      <li class="tui-list__item"> если вероятность $p_1$ не больше $p_2 - \\text{MDE}$, то вероятность ошибки будет не более $${params.beta}\\%$.</li>
      </ul>
      <br/>
      Можно оценить средний размер выборки до остановки теста.
      Он будет зависеть от истинного значения конверсии $p$:
      <ul class="tui-list">
      <li class="tui-list__item"> если вероятность $p_1$ не меньше $p_2$,
      то средний размер первой и второй выборок не превышает
      <b><span style="font-size: 150%">${params.calcResult.hypothesis.leftSampleSize}</span></b>
      и <b><span style="font-size: 150%">${params.calcResult.hypothesis.rightSampleSize}</span></b>, соответственно,</li>
      <li class="tui-list__item"> если вероятность $p_1$ не больше $p_2 - \\text{MDE}$,
      то средний размер первой и второй выборок не превышает
      <b><span style="font-size: 150%">${params.calcResult.alternative.leftSampleSize}</span></b>
      и <b><span style="font-size: 150%">${params.calcResult.alternative.rightSampleSize}</span></b>, соответственно,</li>
      <li class="tui-list__item"> в худшем случае средний размер первой и второй выборок будет равен
      <b><span style="font-size: 150%">${params.calcResult.max.leftSampleSize}</span></b>
      и <b><span style="font-size: 150%">${params.calcResult.max.rightSampleSize}</span></b>, соответственно.</li>
      </ul>
      <h1>Критерий</h1>
      Последовательный анализ реализован в <a href="https://colab.research.google.com/drive/1CF1EJwnn3A2z6XevgACWvqRZNWihJCHv#scrollTo=dbhDZhjXFRCd&line=4&uniqifier=1"> colab блокноте</a>.
      Им можно воспользоваться с помощью следующего кода.`,
    code: `p0 = ${params.p0} / 100
d = ${params.mde} / 100
alpha = ${params.alpha} / 100
beta = ${params.beta} / 100

# Класс последовательного анализа
sprt = BinaryTwoSampleSprt(p0, d, alpha, beta,
                           alternative="less")

# Можно добавлять по одному элементу с помощью метода sprt.append
# или добавлять сразу всю выборку с помощью sprt.append_list
# Оба метода возвращают описание решения, которое следует принять:
# или продолжать тест, или завершать с определённым выводом`,
  }
}


function binaryTwoSidedCalculationContent(params: TwoSampleStandardCalculationResultParams): StandardCalculationContent {
  return {
    description: `
      <h1>Постановка задачи</h1>
      Пусть $p_1$ - вероятность успеха на первой выборке, $p_2$ - вероятность успеха на второй выборке.
      Мы проверяем гипотезу $p_1 = p_2$ против альтернативы $|p_1 - p_2| \\geq \\text{MDE}$.
      <h1>Размер выборки</h1>
      При использовании последовательного анализа <b>не нужно определять заранее размер выборки</b>.
      В момент остановки теста:
      <ul class="tui-list">
      <li class="tui-list__item"> если вероятности $p_1$ и $p_2$ совпадают, то вероятность ошибки будет не более $${params.alpha}\\%$,</li>
      <li class="tui-list__item"> если вероятности $p_1$ и $p_2$ различаются как минимум на MDE, то вероятность ошибки будет не более $${params.beta}\\%$.</li>
      </ul>
      <br/>
      Можно оценить средний размер выборки до остановки теста
      посредством моделирования,
      однако аналитической формулы нет.
      <h1>Критерий</h1>
      Последовательный анализ реализован в <a href="https://colab.research.google.com/drive/1CF1EJwnn3A2z6XevgACWvqRZNWihJCHv#scrollTo=Jt7ub51xJ-Zy&line=4&uniqifier=1"> colab блокноте</a>.
      Им можно воспользоваться с помощью следующего кода.`,
    code: `p0 = ${params.p0} / 100
d = ${params.mde} / 100
alpha = ${params.alpha} / 100
beta = ${params.beta} / 100

# Класс последовательного анализа
sprt = BinaryTwoSampleSprt(p0, d, alpha, beta,
                           alternative="two-sided")

# Можно добавлять по одному элементу с помощью метода sprt.append
# или добавлять сразу всю выборку с помощью sprt.append_list
# Оба метода возвращают описание решения, которое следует принять:
# или продолжать тест, или завершать с определённым выводом`,
  }
}
