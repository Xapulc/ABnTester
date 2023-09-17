package com.abntester.sample.twosample

import com.abntester.sample.common.*
import com.abntester.utils.minus
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class TwoSampleBinarySizeCalculator {

    fun calculate(params: TwoSampleBinarySampleSizeCalculationParams): GeneralSampleSizeCalculationResult {
        with(params) {
            val alphaCorrected = alphaCorrected(alpha, alternative)
            val variance = p * (1 - p)
            val alternativeVariance = resolveAlternativeVariance(alternative, p, mde)
            val zOneMinusAlpha = normQuantile(1 - alphaCorrected)
            val zOneMinusBeta = normQuantile(1 - beta)
            val twoSampleVarianceEstimate = variance * (1 - leftProportion) + alternativeVariance * leftProportion
            val size = twoSampleVarianceEstimate * (zOneMinusAlpha + zOneMinusBeta).pow(2) / mde.pow(2)
            return GeneralSampleSizeCalculationResult(sampleSize = size)
        }
    }
}
