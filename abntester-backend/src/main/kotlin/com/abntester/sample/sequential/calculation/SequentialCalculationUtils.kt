package com.abntester.sample.sequential.calculation

import com.abntester.sample.common.SampleAlternative

object SequentialCalculationUtils {

    fun calcPLowAndHigh(p: Double, mde: Double, alternative: SampleAlternative): PLowAndHigh {
        val pLow: Double = when (alternative) {
            SampleAlternative.RIGHT_SIDED -> p
            SampleAlternative.LEFT_SIDED -> p - mde
            SampleAlternative.TWO_SIDED -> throw UnsupportedOperationException("Left-sided alternative is not supported")
        }
        val pHigh: Double = when (alternative) {
            SampleAlternative.RIGHT_SIDED -> p + mde
            SampleAlternative.LEFT_SIDED -> p
            SampleAlternative.TWO_SIDED -> throw UnsupportedOperationException("Left-sided alternative is not supported")
        }
        return PLowAndHigh(pLow, pHigh)
    }


    fun calcTargetP(p: Double, pLow: Double, pHigh: Double, alternative: SampleAlternative, isHypothesis: Boolean): Double {
        if (isHypothesis) {
            return p
        }
        return when (alternative) {
            SampleAlternative.RIGHT_SIDED -> pHigh
            SampleAlternative.LEFT_SIDED -> pLow
            SampleAlternative.TWO_SIDED -> throw UnsupportedOperationException("Two-sided alternative is not supported")
        }
    }

    fun calcAlphaBound(alpha: Double, beta: Double, alternative: SampleAlternative): AlphaBound {
        return when (alternative) {
            SampleAlternative.RIGHT_SIDED -> AlphaBound(beta, alpha)
            SampleAlternative.LEFT_SIDED -> AlphaBound(alpha, beta)
            SampleAlternative.TWO_SIDED -> throw UnsupportedOperationException("Two-sided alternative is not supported")
        }
    }

}

data class PLowAndHigh(val pLow: Double, val pHigh: Double)

data class AlphaBound(val alphaLow: Double, val alphaHigh: Double)


