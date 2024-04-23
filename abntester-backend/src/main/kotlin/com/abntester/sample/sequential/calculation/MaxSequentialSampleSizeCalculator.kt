package com.abntester.sample.sequential.calculation

import com.abntester.sample.common.BinarySampleSizeCalculationParams
import java.util.stream.DoubleStream
import javax.enterprise.context.ApplicationScoped
import kotlin.math.abs
import kotlin.math.ceil
import kotlin.math.exp
import kotlin.math.ln

@ApplicationScoped
class MaxSequentialSampleSizeCalculator {

    fun calcMaxSequentialSampleSize(
        params: BinarySampleSizeCalculationParams
    ): Int {
        val (pLow, pHigh) = SequentialCalculationUtils.calcPLowAndHigh(
            params.p.toDouble(),
            params.mde.toDouble(),
            params.alternative
        )
        val (alphaLow, alphaHigh) = SequentialCalculationUtils.calcAlphaBound(
            params.alpha.toDouble(),
            params.beta.toDouble(),
            params.alternative
        )
        return calcMaxSequentialSampleSize(pLow, pHigh, alphaLow, alphaHigh)
    }

    fun calcMaxSequentialSampleSize(
        pLow: Double,
        pHigh: Double,
        alphaLow: Double,
        alphaHigh: Double
    ): Int {
        val lowBound = ln(alphaLow / (1 - alphaHigh))
        val highBound = ln((1 - alphaLow) / alphaHigh)
        val res = searchMaxSampleSize(lowBound, highBound, pLow, pHigh)
        return ceil(res).toInt()
    }

    private fun searchMaxSampleSize(lowBound: Double, highBound: Double, pLow: Double, pHigh: Double): Double {

        fun f(a: Double, b: Double, h: Double): Double {
            return (exp(a * h) - exp(b * h)) / (a * (1 - exp(b * h)) + b * (exp(a * h) - 1))
        }

        fun helper(h: Double): Double {
            return if (abs(h) < 1e-8) {
                lowBound * highBound / (ln(pHigh / pLow) * ln((1 - pHigh) / (1 - pLow)))
            } else {
                f(ln(pHigh / pLow), ln((1 - pHigh) / (1 - pLow)), h) /
                        f(highBound, lowBound, h)
            }
        }

        val min = -1.0
        val max = 1.0
        val step = 0.001
        val sampleSize: Double = DoubleStream.iterate(min) { it + step }
            .takeWhile { it < max }
            .map { helper(it) }
            .max().asDouble

        return sampleSize
    }
}
