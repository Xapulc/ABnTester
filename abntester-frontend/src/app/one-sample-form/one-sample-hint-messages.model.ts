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
    },
  },
  {
    alternative: OneTwoSidedAlternativeType.TWO_SIDED,
    type: BinarySampleType.BINARY,
    params: {
      alpha: 'Ошибкой I рода называется ситуация, в которой ' +
        '<ul class="tui-list">' +
        '<li class="tui-list__item"> по данным мы приняли альтернативу $H_1: p \\neq p_0$ (сделали вывод, что конверсия $p$ отличается от $p_0$), ' +
        '<li class="tui-list__item">  а на самом деле справедлива гипотеза $H_0: p = p_0$ (конверсия $p$ равна $p_0$).' +
        '</ul>' +
        'Уровень значимости $\\alpha$ является ограничением на вероятность ошибки I рода. ' +
        'Он позволяет ограничить частоту неверных выявлений роста конверсии при отсутствии этого роста."',
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
