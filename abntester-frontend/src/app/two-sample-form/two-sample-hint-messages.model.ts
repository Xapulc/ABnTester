import {HintContentModel} from '../hint-content/hint-content.model';
import {BinarySampleType} from '../parameters/is-binary-radio/is-binary-radio.model';
import {OneTwoSidedAlternativeType} from '../parameters/one-two-sided-alternative/one-two-sided-alternative.model';

export const twoSampleHints: HintContentModel[] = [
  {
    alternative: OneTwoSidedAlternativeType.LEFT_SIDED,
    type: BinarySampleType.BINARY,
    params: {
      alpha: 'Ошибкой I рода называется ситуация, в которой ' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли альтернативу $H_1: p_1 > p_2$ (сделали вывод, что конверсия $p_1$ на первой выборке больше конверсии $p_2$ на второй выборке),</li>' +
        '<li class="tui-list__item"> а на самом деле справедлива гипотеза $H_0: p_1 \\leq p_2$ (конверсия $p_1$ не выше конверсии $p_2$).</li>' +
        '</ul>' +
        'Уровень значимости $\\alpha$ является ограничением на вероятность ошибки I рода. ' +
        'Он позволяет ограничить частоту неверных выявлений роста конверсии на первой выборке относительно второй при отсутствии такого роста.',
      beta: 'Ошибкой II рода называется ситуация, в которой ' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли гипотезу $H_0: p_1 \\leq p_2$ (сделали вывод, что конверсия $p_1$ на первой выборке не выше конверсии $p_2$ на второй выборке), </li>' +
        '<li class="tui-list__item"> а на самом деле справедлива альтернатива $H_1: p_1 > p_2$ (конверсия $p_1$ выше конверсии $p_2$).</li>' +
        '</ul>' +
        'Размер выборки решает проблему ограничения вероятности ошибки II рода в случае, когда конверсия $p_1$ выше конверсии $p_2$ хотя бы на MDE (то есть справедлива более узкая альтернатива $H_1\': p_1 \\geq p_2 + \\text{MDE}$). ' +
        'Калькулятор расчитывает размер выборки исходя из того, что вероятность ошибки II рода должна не превышать параметр $\\beta$.',
      mde: 'Минимальный прирост конверсии (не путать с Up Lift!), который хотелось бы обнаружить в случае его наличия. ' +
        'Если конверсия $p_1$ выросла на MDE относительно конверсии $p_2$ (то есть $p_1 \\geq p_2 + \\text{MDE}$), ' +
        'то вероятность не обнаружить роста конверсии (ошибки II рода) не больше $\\beta$.',
      probability: 'Параметр, используемый для оценки конверсий обоих выборок. ' +
        'В случае, когда по одной из метрик есть исторические данные, можно использовать историческую конверсию по схожей по параметрам выборке. ' +
        'Параметр влияет на оценку дисперсии, нужную для размера выборки. В самом худшем случае можно использовать конверсию = $50\\%$.',
      variance: '',
    },
  },
  {
    alternative: OneTwoSidedAlternativeType.RIGHT_SIDED,
    type: BinarySampleType.BINARY,
    params: {
      alpha: 'Ошибкой I рода называется ситуация, в которой ' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли альтернативу $H_1: p_1 < p_2$ (сделали вывод, что конверсия $p_1$ на первой выборке меньше конверсии $p_2$ на второй выборке),</li>' +
        '<li class="tui-list__item"> а на самом деле справедлива гипотеза $H_0: p_1 \\geq p_2$ (конверсия $p_1$ не ниже конверсии $p_2$).</li>' +
        '</ul>' +
        'Уровень значимости $\\alpha$ является ограничением на вероятность ошибки I рода. ' +
        'Он позволяет ограничить частоту неверных выявлений роста конверсии на второй выборке относительно первой при отсутствии такого роста.',
      beta: 'Ошибкой II рода называется ситуация, в которой ' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли гипотезу $H_0: p_1 \\geq p_2$ (сделали вывод, что конверсия $p_1$ на первой выборке не ниже конверсии $p_2$ на второй выборке), </li>' +
        '<li class="tui-list__item"> а на самом деле справедлива альтернатива $H_1: p_1 < p_2$ (конверсия $p_1$ ниже конверсии $p_2$).</li>' +
        '</ul>' +
        'Размер выборки решает проблему ограничения вероятности ошибки II рода в случае, когда конверсия $p_1$ ниже конверсии $p_2$ хотя бы на MDE (то есть справедлива более узкая альтернатива $H_1\': p_1 + \\text{MDE} \\leq p_2$). ' +
        'Калькулятор расчитывает размер выборки исходя из того, что вероятность ошибки II рода должна не превышать параметр $\\beta$.',
      mde: 'Минимальный прирост конверсии (не путать с Up Lift!), который хотелось бы обнаружить в случае его наличия. ' +
        'Если конверсия $p_2$ выросла на MDE относительно конверсии $p_1$ (то есть $p_2 \\geq p_1 + \\text{MDE}$), ' +
        'то вероятность не обнаружить роста конверсии (ошибки II рода) не больше $\\beta$.',
      probability: 'Параметр, используемый для оценки конверсий обоих выборок. ' +
        'В случае, когда по одной из метрик есть исторические данные, можно использовать историческую конверсию по схожей по параметрам выборке. ' +
        'Параметр влияет на оценку дисперсии, нужную для размера выборки. В самом худшем случае можно использовать конверсию = $50\\%$.',
      variance: '',
    },
  },
  {
    alternative: OneTwoSidedAlternativeType.TWO_SIDED,
    type: BinarySampleType.BINARY,
    params: {
      alpha: 'Ошибкой I рода называется ситуация, в которой ' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли альтернативу $H_1: p_1 \\neq p_2$ (сделали вывод, что конверсия $p_1$ на первой выборке отличается от конверсии $p_2$ на второй выборке),</li>' +
        '<li class="tui-list__item"> а на самом деле справедлива гипотеза $H_0: p_1 = p_2$ (конверсии $p_1$ и $p_2$ равны).</li>' +
        '</ul>' +
        'Уровень значимости $\\alpha$ является ограничением на вероятность ошибки I рода. ' +
        'Он позволяет ограничить частоту неверных выявлений различий конверсий при их равенстве.',
      beta: 'Ошибкой II рода называется ситуация, в которой ' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли гипотезу $H_0: p_1 = p_2$ (сделали вывод, что конверсии $p_1$ и $p_2$ на первой и второй выборках соответственно равны), </li>' +
        '<li class="tui-list__item"> а на самом деле справедлива альтернатива $H_1: p_1 \\neq p_2$ (конверсии $p_1$ и $p_2$ различаются).</li>' +
        '</ul>' +
        'Размер выборки решает проблему ограничения вероятности ошибки II рода в случае, когда конверсии $p_1$ и $p_2$ отличаются хотя бы на MDE (то есть справедлива более узкая альтернатива $H_1\': |p_1 - p_2| \\geq \\text{MDE}$). ' +
        'Калькулятор расчитывает размер выборки исходя из того, что вероятность ошибки II рода должна не превышать параметр $\\beta$.',
      mde: 'Минимальное изменение конверсии (не путать с Up Lift!), который хотелось бы обнаружить в случае его наличия. ' +
        'Если конверсии $p_1$ и $p_2$ отличаются хотя бы на MDE (то есть $|p_1 - p_2| \\geq \\text{MDE}$), ' +
        'то вероятность не обнаружить различий конверсий (ошибки II рода) не больше $\\beta$.',
      probability: 'Параметр, используемый для оценки конверсий обоих выборок. ' +
        'В случае, когда по одной из метрик есть исторические данные, можно использовать историческую конверсию по схожей по параметрам выборке. ' +
        'Параметр влияет на оценку дисперсии, нужную для размера выборки. В самом худшем случае можно использовать конверсию = $50\\%$.',
      variance: '',
    },
  },
  {
    alternative: OneTwoSidedAlternativeType.LEFT_SIDED,
    type: BinarySampleType.NON_BINARY,
    params: {
      alpha: 'Ошибкой I рода называется ситуация, в которой ' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли альтернативу $H_1: \\mu_1 \> \\mu_2$ ' +
        '(сделали вывод, что мат. ожидание $\\mu_1$ целевой метрики теста в первой вариации ' +
        'больше мат. ожидания $\\mu_2$ целевой метрики теста во второй вариации), </li>' +
        '<li class="tui-list__item"> а на самом деле справедлива гипотеза $H_0: \\mu_1 \\leq \\mu_2$ ' +
        '(мат. ожидание $\\mu_1$ не выше мат. ожидания $\\mu_2$).</li>' +
        '</ul>' +
        'Уровень значимости $\\alpha$ является ограничением на вероятность ошибки I рода. ' +
        'Он позволяет ограничить частоту неверных выявлений роста среднего на первой выборке ' +
        'относительно второй при отсутствии такого роста.',
      beta: 'Ошибкой II рода называется ситуация, в которой ' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли гипотезу $H_0: \\mu_1 \\leq \\mu_2$ ' +
        '(сделали вывод, что мат. ожидание $\\mu_1$ целевой метрики теста в первой вариации ' +
        'не выше мат. ожидания $\\mu_2$ целевой метрики теста во второй вариации), </li>' +
        '<li class="tui-list__item"> а на самом деле справедлива альтернатива $H_1: \\mu_1 \> \\mu_2$ ' +
        '(мат. ожидание $\\mu_1$ выше мат. ожидания $\\mu_2$).</li>' +
        '</ul>' +
        'Размер выборки решает проблему ограничения вероятности ошибки II рода в случае, ' +
        'когда мат. ожидание $\\mu_1$ выше мат. ожидания $\\mu_2$ хотя бы на MDE ' +
        '(то есть справедлива более узкая альтернатива $H_1\': \\mu_1 \\geq \\mu_2 + \\text{MDE}$), ' +
        'и при этом дисперсия целевой метрики теста в каждой вариации не превышает порога $\\sigma_0^2$ (другой параметр расчёта размера выборки). ' +
        'Калькулятор расчитывает размер выборки исходя из того, ' +
        'что вероятность ошибки II рода должна не превышать параметр $\\beta$.',
      mde: 'Минимальное отличие средних целевой метрики, которое хотелось бы заметить. ' +
        'Если мат. ожидание $\\mu_1$ выросло на MDE относительно мат. ожидания $\\mu_2$ ' +
        '(то есть $\\mu_1 \\geq \\mu_2 + \\text{MDE}$) и дисперсия метрик правильно ограничена, ' +
        'то вероятность не обнаружить роста среднего (ошибки II рода) не больше $\\beta$.',
      variance: 'Оценка дисперсии целевой метрики теста. ' +
        'Она влияет на то, с какой точностью можно оценить значение мат. ожидания метрики, ' +
        'поэтому нужно для определения размера выборки.',
      probability: '',
    },
  },
  {
    alternative: OneTwoSidedAlternativeType.RIGHT_SIDED,
    type: BinarySampleType.NON_BINARY,
    params: {
      alpha: 'Ошибкой I рода называется ситуация, в которой ' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли альтернативу $H_1: \\mu_1 \< \\mu_2$ ' +
        '(сделали вывод, что мат. ожидание $\\mu_1$ целевой метрики теста в первой вариации ' +
        'меньше мат. ожидания $\\mu_2$ целевой метрики теста во второй вариации), </li>' +
        '<li class="tui-list__item"> а на самом деле справедлива гипотеза $H_0: \\mu_1 \\geq \\mu_2$ ' +
        '(мат. ожидание $\\mu_1$ не ниже мат. ожидания $\\mu_2$).</li>' +
        '</ul>' +
        'Уровень значимости $\\alpha$ является ограничением на вероятность ошибки I рода. ' +
        'Он позволяет ограничить частоту неверных выявлений роста среднего на второй выборке ' +
        'относительно первой при отсутствии такого роста.',
      beta: 'Ошибкой II рода называется ситуация, в которой ' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли гипотезу $H_0: \\mu_1 \\geq \\mu_2$ ' +
        '(сделали вывод, что мат. ожидание $\\mu_1$ целевой метрики теста в первой вариации ' +
        'не ниже мат. ожидания $\\mu_2$ целевой метрики теста во второй вариации), </li>' +
        '<li class="tui-list__item"> а на самом деле справедлива альтернатива $H_1: \\mu_1 \< \\mu_2$ ' +
        '(мат. ожидание $\\mu_1$ ниже мат. ожидания $\\mu_2$).</li>' +
        '</ul>' +
        'Размер выборки решает проблему ограничения вероятности ошибки II рода в случае, ' +
        'когда мат. ожидание $\\mu_1$ ниже мат. ожидания $\\mu_2$ хотя бы на MDE ' +
        '(то есть справедлива более узкая альтернатива $H_1\': \\mu_1 \\leq \\mu_2 - \\text{MDE}$), ' +
        'и при этом дисперсия целевой метрики теста в каждой вариации не превышает порога $\\sigma_0^2$ (другой параметр расчёта размера выборки). ' +
        'Калькулятор расчитывает размер выборки исходя из того, ' +
        'что вероятность ошибки II рода должна не превышать параметр $\\beta$.',
      mde: 'Минимальное отличие средних целевой метрики, которое хотелось бы заметить. ' +
        'Если мат. ожидание $\\mu_2$ выросло на MDE относительно мат. ожидания $\\mu_1$ ' +
        '(то есть $\\mu_2 \\geq \\mu_1 + \\text{MDE}$) и дисперсия метрик правильно ограничена, ' +
        'то вероятность не обнаружить роста среднего (ошибки II рода) не больше $\\beta$.',
      variance: 'Оценка дисперсии целевой метрики теста. ' +
        'Она влияет на то, с какой точностью можно оценить значение мат. ожидания метрики, ' +
        'поэтому нужно для определения размера выборки.',
      probability: '',
    },
  },
  {
    alternative: OneTwoSidedAlternativeType.TWO_SIDED,
    type: BinarySampleType.NON_BINARY,
    params: {
      alpha: 'Ошибкой I рода называется ситуация, в которой ' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли альтернативу $H_1: \\mu_1 \\neq \\mu_2$ ' +
        '(сделали вывод, что мат. ожидания $\\mu_1$ и $\\mu_2$ целевой метрики теста в первой и второй вариации соответственно различаются), </li>' +
        '<li class="tui-list__item"> а на самом деле справедлива гипотеза $H_0: \\mu_1 = \\mu_2$ ' +
        '(мат. ожидания $\\mu_1$ и $\\mu_2$ совпадают).</li>' +
        '</ul>' +
        'Уровень значимости $\\alpha$ является ограничением на вероятность ошибки I рода. ' +
        'Он позволяет ограничить частоту неверных выявлений различий средних целевой метрики теста на двух вариациях.',
      beta: 'Ошибкой II рода называется ситуация, в которой ' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли гипотезу $H_0: \\mu_1 = \\mu_2$ ' +
        '(сделали вывод, что мат. ожидания $\\mu_1$ и $\\mu_2$ целевой метрики теста в первой и второй вариации соответственно совпадают), </li>' +
        '<li class="tui-list__item"> а на самом деле справедлива альтернатива $H_1: \\mu_1 \\neq \\mu_2$ ' +
        '(мат. ожидания $\\mu_1$ и $\\mu_2$ различаются).</li>' +
        '</ul>' +
        'Размер выборки решает проблему ограничения вероятности ошибки II рода в случае, ' +
        'когда мат. ожидание $\\mu_1$ отличается от мат. ожидания $\\mu_2$ хотя бы на MDE ' +
        '(то есть справедлива более узкая альтернатива $H_1\': |\\mu_1 - \\mu_2| \\geq \\text{MDE}$), ' +
        'и при этом дисперсия целевой метрики теста в каждой вариации не превышает порога $\\sigma_0^2$ (другой параметр расчёта размера выборки). ' +
        'Калькулятор расчитывает размер выборки исходя из того, ' +
        'что вероятность ошибки II рода должна не превышать параметр $\\beta$.',
      mde: 'Минимальное отличие средних целевой метрики, которое хотелось бы заметить. ' +
        'Если мат. ожидания $\\mu_1$ и $\\mu_2$ различаются хотя бы на MDE ' +
        '(то есть $|\\mu_1 - \\mu_2| \\geq \\text{MDE}$) и дисперсия метрик правильно ограничена, ' +
        'то вероятность не обнаружить изменения среднего (ошибки II рода) не больше $\\beta$.',
      variance: 'Оценка дисперсии целевой метрики теста. ' +
        'Она влияет на то, с какой точностью можно оценить значение мат. ожидания метрики, ' +
        'поэтому нужно для определения размера выборки.',
      probability: '',
    },
  },
]
