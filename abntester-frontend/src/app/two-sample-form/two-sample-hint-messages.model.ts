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
        '<li class="tui-list__item"> а на самом деле справедлива гипотеза $H_0: p_1 \\geq p_2$ (конверсия $p_1$ не ниже конверсии $p_2$).</li>' +
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
    },
  },
  {
    alternative: OneTwoSidedAlternativeType.RIGHT_SIDED,
    type: BinarySampleType.BINARY,
    params: {
      alpha: 'Ошибкой I рода называется ситуация, в которой ' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли альтернативу $H_1: p_1 < p_2$ (сделали вывод, что конверсия $p_1$ на первой выборке меньше конверсии $p_2$ на второй выборке),</li>' +
        '<li class="tui-list__item"> а на самом деле справедлива гипотеза $H_0: p_1 \\leq p_2$ (конверсия $p_1$ не выше конверсии $p_2$).</li>' +
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
    },
  },
  {
    alternative: OneTwoSidedAlternativeType.LEFT_SIDED,
    type: BinarySampleType.NON_BINARY,
    params: {
      alpha: '',
      beta: '',
    },
  },
  {
    alternative: OneTwoSidedAlternativeType.RIGHT_SIDED,
    type: BinarySampleType.NON_BINARY,
    params: {
      alpha: '',
      beta: '',
    },
  },
  {
    alternative: OneTwoSidedAlternativeType.TWO_SIDED,
    type: BinarySampleType.NON_BINARY,
    params: {
      alpha: '',
      beta: '',
    },
  },
]