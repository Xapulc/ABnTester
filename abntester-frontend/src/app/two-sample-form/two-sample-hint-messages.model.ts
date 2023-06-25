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
    },
  },
  {
    alternative: OneTwoSidedAlternativeType.LEFT_SIDED,
    type: BinarySampleType.NON_BINARY,
    params: {
      alpha: '',
    },
  },
  {
    alternative: OneTwoSidedAlternativeType.RIGHT_SIDED,
    type: BinarySampleType.NON_BINARY,
    params: {
      alpha: '',
    },
  },
  {
    alternative: OneTwoSidedAlternativeType.TWO_SIDED,
    type: BinarySampleType.NON_BINARY,
    params: {
      alpha: '',
    },
  },
]
