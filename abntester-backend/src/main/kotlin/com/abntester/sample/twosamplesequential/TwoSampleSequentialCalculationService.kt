package com.abntester.sample.twosamplesequential

import com.abntester.sample.common.BinarySampleSizeCalculationParams
import com.abntester.utils.div
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class TwoSampleSequentialCalculationService(private val sequentialSampleSizeCalculator: TwoSampleSequentialSizeCalculator) {
    fun calcBinarySampleSize(request: TwoSampleBinaryCalculationRequest): TwoSampleCalculationResponse {
        val result: TwoSampleSequentialSize =
            sequentialSampleSizeCalculator.calcTwoSampleSequentialSize(request.toCalcParams())
        return result.toResponse()
    }

    private fun TwoSampleBinaryCalculationRequest.toCalcParams() = BinarySampleSizeCalculationParams(
        alpha / 100, beta / 100, mde / 100, p / 100, alternative,
    )
}

private fun TwoSampleSequentialSize.toResponse() =
    TwoSampleCalculationResponse(hypothesis.toResponse(), alternative.toResponse(), max.toResponse())


private fun TwoSampleSize.toResponse() = TwoSampleSizeDto(leftSize, rightSize)
