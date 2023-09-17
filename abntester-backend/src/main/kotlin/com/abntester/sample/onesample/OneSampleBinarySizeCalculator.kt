package com.abntester.sample.onesample

import com.abntester.sample.common.*
import com.abntester.utils.minus
import java.math.MathContext
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class OneSampleBinarySizeCalculator {

    fun calculate(params: BinarySampleSizeCalculationParams): GeneralSampleSizeCalculationResult {
        with(params) {
            val alphaCorrected = alphaCorrected(alpha, alternative)
            val varianceSquareRoot = (p * (1 - p)).sqrt(MathContext.DECIMAL128)
            val alternativeVarianceSquareRoot =
                resolveAlternativeVariance(alternative, p, mde).sqrt(MathContext.DECIMAL128)
            val zOneMinusAlpha = normQuantile(1 - alphaCorrected)
            val zOneMinusBeta = normQuantile(1 - beta)
            val size =
                (zOneMinusAlpha * varianceSquareRoot + zOneMinusBeta * alternativeVarianceSquareRoot).pow(2) / mde.pow(2)
            return GeneralSampleSizeCalculationResult(sampleSize = size)
        }
    }
}
