package com.abntester.sample.onesamplesequential

import com.abntester.sample.common.BinarySampleSizeCalculationParams
import com.abntester.utils.div
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class OneSampleSequentialCalculationService(private val oneSampleSequentialCalculator: OneSampleSequentialCalculator) {
    fun calcBinarySampleSize(request: OneSampleBinaryCalculationRequest): OneSampleCalculationResponse {
        val result: SequentialSampleSize =
            oneSampleSequentialCalculator.calcSequentialSampleSize(request.toCalcParams())
        return result.toResponse()
    }

    private fun OneSampleBinaryCalculationRequest.toCalcParams() = BinarySampleSizeCalculationParams(
        alpha / 100, beta / 100, mde / 100, p / 100, alternative,
    )
}

data class SequentialSampleSize(val hypothesisSampleSize: Int, val alternativeSampleSize: Int, val maxSampleSize: Int)

private fun SequentialSampleSize.toResponse() =
    OneSampleCalculationResponse(hypothesisSampleSize, alternativeSampleSize, maxSampleSize)
