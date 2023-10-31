package com.abntester.sample.twosample

import com.abntester.sample.common.*
import com.abntester.utils.minus
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class TwoSampleBinarySizeCalculator {

    fun calculate(params: TwoSampleBinarySampleSizeCalculationParams): GeneralSampleSizeCalculationResult {
        with(params) {
            val alphaCorrected = alphaCorrected(alpha, alternative)
            val zOneMinusAlpha = normQuantile(1 - alphaCorrected)
            val zOneMinusBeta = normQuantile(1 - beta)
            val sampleEffectSize = effectSize(p, mde, alternative)
            val size = (zOneMinusAlpha + zOneMinusBeta).pow(2) / sampleEffectSize.pow(2)
            return GeneralSampleSizeCalculationResult(sampleSize = size)
        }
    }
}
