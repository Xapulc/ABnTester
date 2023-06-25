import {HintContentModel} from '../hint-content/hint-content.model';
import {BinarySampleType} from '../parameters/is-binary-radio/is-binary-radio.model';
import {OneTwoSidedAlternativeType} from '../parameters/one-two-sided-alternative/one-two-sided-alternative.model';

export const oneSampleHints: HintContentModel[] = [
  {
    alternative: OneTwoSidedAlternativeType.LEFT_SIDED,
    type: BinarySampleType.BINARY,
    params: {
      alpha: 'Ошибкой I рода называется ситуация, в которой' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли альтернативу $H_1: p < p_0$ (сделали вывод, что конверсия $p$ ниже порога $p_0$), </li>' +
        '<li class="tui-list__item"> а на самом деле справедлива гипотеза $H_0: p \\geq p_0$ (конверсия $p$ не ниже порога $p_0$).</li>' +
        '</ul>' +
        'Уровень значимости $\\alpha$ является ограничением на вероятность ошибки I рода.' +
        'Он позволяет ограничить частоту неверных выявлений роста конверсии при отсутствии этого роста.',
      beta: 'Ошибкой II рода называется ситуация, в которой ' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item">  по данным мы приняли гипотезу $H_0: p \\geq p_0$ (сделали вывод, что конверсия $p$ не ниже порога $p_0$), </li>' +
        '<li class="tui-list__item">  а на самом деле справедлива альтернатива $H_1: p < p_0$ (конверсия $p$ ниже порога $p_0$).</li>' +
        '</ul>' +
        'Размер выборки решает проблему ограничения вероятности ошибки II рода в случае, когда конверсия $p$ ниже порога $p_0$ хотя бы на MDE (то есть справедлива более узкая альтернатива $H_1\': p \\leq p_0 - \\text{MDE}$). ' +
        'Калькулятор расчитывает размер выборки исходя из того, что вероятность ошибки II рода должна не превышать параметр $\\beta$.',
    },
  },
  {
    alternative: OneTwoSidedAlternativeType.RIGHT_SIDED,
    type: BinarySampleType.BINARY,
    params: {
      alpha: 'Ошибкой I рода называется ситуация, в которой' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли альтернативу $H_1: p > p_0$ (сделали вывод, что конверсия $p$ выше порога $p_0$), </li>' +
        '<li class="tui-list__item"> а на самом деле справедлива гипотеза $H_0: p \\leq p_0$ (конверсия $p$ не превышает порог $p_0$). </li>' +
        '</ul>' +
        'Уровень значимости $\\alpha$ является ограничением на вероятность ошибки I рода.' +
        'Он позволяет ограничить частоту неверных выявлений роста конверсии при отсутствии этого роста.',
      beta: 'Ошибкой II рода называется ситуация, в которой ' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли гипотезу $H_0: p \\leq p_0$ (сделали вывод, что конверсия $p$ не выше порога $p_0$), </li>' +
        '<li class="tui-list__item"> а на самом деле справедлива альтернатива $H_1: p > p_0$ (конверсия $p$ превышает порог $p_0$).</li>' +
        '</ul>' +
        'Размер выборки решает проблему ограничения вероятности ошибки II рода в случае, когда конверсия $p$ превышает порог $p_0$ хотя бы на MDE (то есть справедлива более узкая альтернатива $H_1\': p \\geq p_0 + \\text{MDE}$). ' +
        'Калькулятор расчитывает размер выборки исходя из того, что вероятность ошибки II рода должна не превышать параметр $\\beta$.',
    },
  },
  {
    alternative: OneTwoSidedAlternativeType.TWO_SIDED,
    type: BinarySampleType.BINARY,
    params: {
      alpha: 'Ошибкой I рода называется ситуация, в которой ' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли альтернативу $H_1: p \\neq p_0$ (сделали вывод, что конверсия $p$ отличается от $p_0$), </li>' +
        '<li class="tui-list__item">  а на самом деле справедлива гипотеза $H_0: p = p_0$ (конверсия $p$ равна $p_0$).</li>' +
        '</ul>' +
        'Уровень значимости $\\alpha$ является ограничением на вероятность ошибки I рода. ' +
        'Он позволяет ограничить частоту неверных выявлений роста конверсии при отсутствии этого роста."',
      beta: 'Ошибкой II рода называется ситуация, в которой ' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли гипотезу $H_0: p = p_0$ (сделали вывод, что конверсия $p$ равна $p_0$), </li>' +
        '<li class="tui-list__item"> а на самом деле справедлива альтернатива $H_1: p \\neq p_0$ (конверсия $p$ отличается от $p_0$).</li>' +
        '</ul>' +
        'Размер выборки решает проблему ограничения вероятности ошибки II рода в случае, когда конверсия $p$ отличается от значения $p_0$ хотя бы на MDE (то есть справедлива более узкая альтернатива $H_1\': |p - p_0| \\geq \\text{MDE}$). ' +
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
