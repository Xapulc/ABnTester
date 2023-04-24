package com.abntester.sample.twosample

import com.abntester.sample.twosample.TwoSampleBinaryAlternative.ONE_SIDED
import com.abntester.sample.twosample.TwoSampleBinaryAlternative.TWO_SIDED
import com.abntester.utils.div
import com.abntester.utils.minus
import org.apache.commons.math3.distribution.NormalDistribution
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class TwoSampleCalculationService {

    companion object {
        val DEFAULT_NORMAL_DISTRIBUTION = NormalDistribution()
    }

    fun calcBinarySampleSize(request: TwoSampleBinaryCalculationRequest): TwoSampleBinaryCalculationResponse {
        with(request) {
            val alphaCorrected = when (alternative) {
                ONE_SIDED -> alpha
                TWO_SIDED -> alpha / 2
            }
            val zOneMinusAlpha =
                DEFAULT_NORMAL_DISTRIBUTION.inverseCumulativeProbability((1 - alphaCorrected).toDouble()).toBigDecimal()
            val zBeta = DEFAULT_NORMAL_DISTRIBUTION.inverseCumulativeProbability(beta.toDouble()).toBigDecimal()
            val rightProportion = 1 - leftProportion
            val left = p * (1 - p) * (zOneMinusAlpha - zBeta).pow(2) / (rightProportion * mde.pow(2))
            val right = p * (1 - p) * (zOneMinusAlpha - zBeta).pow(2) / (leftProportion * mde.pow(2))
            return TwoSampleBinaryCalculationResponse(leftSampleSize = left.toInt(), rightSampleSize = right.toInt())
        }
    }
}
