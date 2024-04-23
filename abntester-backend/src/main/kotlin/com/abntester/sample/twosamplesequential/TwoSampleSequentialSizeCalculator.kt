package com.abntester.sample.twosamplesequential

import com.abntester.sample.common.BinarySampleSizeCalculationParams
import com.abntester.sample.common.SampleAlternative
import com.abntester.sample.sequential.calculation.MaxSequentialSampleSizeCalculator
import com.abntester.sample.sequential.calculation.SequentialCalculationUtils
import com.abntester.sample.sequential.calculation.SequentialSampleSizeCalculator
import javax.enterprise.context.ApplicationScoped
import kotlin.math.abs
import kotlin.math.ceil

@ApplicationScoped
class TwoSampleSequentialSizeCalculator(
    private val sequentialSampleSizeCalculator: SequentialSampleSizeCalculator,
    private val maxSequentialSampleSizeCalculator: MaxSequentialSampleSizeCalculator
) {

    companion object {
        const val P0_TRANSFORMED: Double = 1.0 / 2.0
    }

    /**
     * @see https://github.com/Xapulc/wald-sequential-probability-ratio-test/blob/main/binary/checking/two_sample_sequential_sample_size.py
     */
    fun calcTwoSampleSequentialSize(params: BinarySampleSizeCalculationParams): TwoSampleSequentialSize {
        val hypothesisSampleSize: TwoSampleSize = calcTwoSampleSequentialSize(params, true)
        val alternativeSampleSize: TwoSampleSize = calcTwoSampleSequentialSize(params, false)
        val maxSampleSize: TwoSampleSize = calcMaxSequentialSize(params)
        return TwoSampleSequentialSize(hypothesisSampleSize, alternativeSampleSize, maxSampleSize)
    }

    private fun calcTwoSampleSequentialSize(
        params: BinarySampleSizeCalculationParams,
        isHypothesis: Boolean
    ): TwoSampleSize {
        with(params) {
            val dTransformed = transformTwoSampleOneSidedMDE(p.toDouble(), mde.toDouble(), alternative)
            val diffTransformed: Double = if (isHypothesis) {
                0.0
            } else {
                dTransformed
            }
            val pTransformed = calcPTransformed(diffTransformed, alternative)
            val size: Int = sequentialSampleSizeCalculator.oneSidedSequentialSampleSize(
                pTransformed,
                P0_TRANSFORMED,
                dTransformed,
                alpha.toDouble(),
                beta.toDouble(),
                alternative
            )
            val scale: Double = calcScale(p.toDouble(), mde.toDouble(), alternative)
            val oneSampleSize: Int = ceil(size / scale).toInt()
            return TwoSampleSize(oneSampleSize, oneSampleSize)
        }
    }

    private fun calcMaxSequentialSize(params: BinarySampleSizeCalculationParams): TwoSampleSize {
        with(params) {
            val dTransformed = transformTwoSampleOneSidedMDE(p.toDouble(), mde.toDouble(), alternative)
            val paramsTransformed = BinarySampleSizeCalculationParams(
                alpha,
                beta,
                dTransformed.toBigDecimal(),
                P0_TRANSFORMED.toBigDecimal(),
                alternative
            )
            val maxSampleSize: Int = maxSequentialSampleSizeCalculator.calcMaxSequentialSampleSize(paramsTransformed)
            val scale: Double = calcScale(p.toDouble(), mde.toDouble(), alternative)
            val oneSampleSize: Int = ceil(maxSampleSize / scale).toInt()
            return TwoSampleSize(oneSampleSize, oneSampleSize)
        }

    }

    private fun transformTwoSampleOneSidedMDE(p: Double, mde: Double, alternative: SampleAlternative): Double {
        val (pLow, pHigh) = SequentialCalculationUtils.calcPLowAndHigh(
            p, mde, alternative
        )
        val pTransformed = (1 - pLow) * pHigh / ((1 - pLow) * pHigh + pLow * (1 - pHigh))
        val dTransformed = abs(pTransformed - P0_TRANSFORMED)
        return dTransformed
    }

    private fun calcPTransformed(diffTransformed: Double, alternative: SampleAlternative): Double {
        return when (alternative) {
            SampleAlternative.LEFT_SIDED -> P0_TRANSFORMED - diffTransformed
            SampleAlternative.RIGHT_SIDED -> P0_TRANSFORMED + diffTransformed
            SampleAlternative.TWO_SIDED -> throw UnsupportedOperationException("Left-sided alternative is not supported")
        }
    }

    private fun calcScale(p: Double, d: Double, alternative: SampleAlternative): Double {
        return when (alternative) {
            SampleAlternative.LEFT_SIDED -> p * (1 - (p - d)) + (p - d) * (1 - p)
            SampleAlternative.RIGHT_SIDED -> p * (1 - (p + d)) + (p + d) * (1 - p)
            SampleAlternative.TWO_SIDED -> throw UnsupportedOperationException("Left-sided alternative is not supported")
        }
    }
}

data class TwoSampleSize(val leftSize: Int, val rightSize: Int)

data class TwoSampleSequentialSize(
    val hypothesis: TwoSampleSize,
    val alternative: TwoSampleSize,
    val max: TwoSampleSize
)
