package com.abntester.sample.sequential.calculation

import com.abntester.sample.common.SampleAlternative
import javax.enterprise.context.ApplicationScoped
import kotlin.math.abs
import kotlin.math.ceil
import kotlin.math.exp
import kotlin.math.ln

/**
 * @see https://github.com/Xapulc/wald-sequential-probability-ratio-test/blob/main/binary/checking/one_sample_sequential_sample_size.py
 */
@ApplicationScoped
class SequentialSampleSizeCalculator {

    fun oneSidedSequentialSampleSize(
        p: Double,
        p0: Double,
        d: Double,
        alpha: Double,
        beta: Double,
        alternative: SampleAlternative
    ): Int {
        val (pLow, pHigh) = SequentialCalculationUtils.calcPLowAndHigh(p0, d, alternative)
        val (alphaLow, alphaHigh) = SequentialCalculationUtils.calcAlphaBound(
            alpha,
            beta,
            alternative
        )
        return oneSidedSequentialSampleSize(p, pLow, pHigh, alphaLow, alphaHigh)
    }

    private fun oneSidedSequentialSampleSize(
        p: Double,
        pLow: Double,
        pHigh: Double,
        alphaLow: Double,
        alphaHigh: Double
    ): Int {
        val lowBound = ln(alphaLow / (1 - alphaHigh))
        val highBound = ln((1 - alphaLow) / alphaHigh)
        val h = operationCharacteristicRoot(p, pLow, pHigh)
        val oC = operationCharacteristic(h, alphaLow, alphaHigh)
        val eZ = p * ln(pHigh / pLow) - (1 - p) * ln((1 - pLow) / (1 - pHigh))
        return ceil((oC * lowBound + (1 - oC) * highBound) / eZ).toInt()
    }

    private fun operationCharacteristicRoot(p: Double, pLow: Double, pHigh: Double): Double {
        return when {
            abs(p - pLow) < 1e-8 -> 1.0
            abs(p - pHigh) < 1e-8 -> -1.0
            else -> throw IllegalArgumentException("Value $p should be $pLow or $pHigh")
        }
    }

    private fun operationCharacteristic(h: Double, alphaLow: Double, alphaHigh: Double): Double {
        val lowBound = ln(alphaLow / (1 - alphaHigh))
        val highBound = ln((1 - alphaLow) / alphaHigh)

        return if (h == 0.0) {
            highBound / (highBound - lowBound)
        } else {
            (exp(highBound * h) - 1) / (exp(highBound * h) - exp(lowBound * h))
        }
    }
}
