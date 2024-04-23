package com.abntester.sample.onesamplesequential

import com.abntester.sample.common.BinarySampleSizeCalculationParams
import com.abntester.sample.sequential.calculation.MaxSequentialSampleSizeCalculator
import com.abntester.sample.sequential.calculation.SequentialCalculationUtils
import com.abntester.sample.sequential.calculation.SequentialSampleSizeCalculator
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class OneSampleSequentialCalculator(
    private val sequentialSampleSizeCalculator: SequentialSampleSizeCalculator,
    private val maxSequentialSampleSizeCalculator: MaxSequentialSampleSizeCalculator
) {

    fun calcSequentialSampleSize(params: BinarySampleSizeCalculationParams): SequentialSampleSize {
        val (pLow, pHigh) = SequentialCalculationUtils.calcPLowAndHigh(
            params.p.toDouble(),
            params.mde.toDouble(),
            params.alternative
        )
        val hypothesisSampleSize: Int = innerSequentialSampleSize(pLow, pHigh, params, true)
        val alternativeSampleSize: Int = innerSequentialSampleSize(pLow, pHigh, params, false)
        val maxSampleSize: Int = maxSequentialSampleSizeCalculator.calcMaxSequentialSampleSize(params)
        return SequentialSampleSize(hypothesisSampleSize, alternativeSampleSize, maxSampleSize)
    }

    private fun innerSequentialSampleSize(
        pLow: Double,
        pHigh: Double,
        params: BinarySampleSizeCalculationParams,
        isHypothesis: Boolean
    ): Int {
        with(params) {
            val targetP =
                SequentialCalculationUtils.calcTargetP(params.p.toDouble(), pLow, pHigh, alternative, isHypothesis)
            return sequentialSampleSizeCalculator.oneSidedSequentialSampleSize(
                targetP,
                p.toDouble(),
                mde.toDouble(),
                alpha.toDouble(),
                beta.toDouble(),
                alternative
            )
        }
    }
}
