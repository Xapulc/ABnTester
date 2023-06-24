package com.abntester.sample.twosample

import com.abntester.sample.GeneralSampleSizeCalculationParams
import com.abntester.sample.GeneralSampleSizeCalculationResult
import com.abntester.sample.GeneralSampleSizeCalculationService
import com.abntester.utils.div
import com.abntester.utils.minus
import java.math.BigDecimal
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class TwoSampleCalculationService constructor(private val generalSampleSizeCalculationService: GeneralSampleSizeCalculationService) {

    fun calcBinarySampleSize(request: TwoSampleBinaryCalculationRequest): TwoSampleCalculationResponse {
        val result: GeneralSampleSizeCalculationResult =
            generalSampleSizeCalculationService.calcSampleSize(request.toCalcParams())
        return result.splitProportionally(request.leftProportion)
    }

    private fun TwoSampleBinaryCalculationRequest.toCalcParams() = GeneralSampleSizeCalculationParams(
        alpha.div(100), beta.div(100), mde.div(100), p.div(100) * (1 - p.div(100)), alternative
    )

    fun calcNonBinarySampleSize(request: TwoSampleNonBinaryCalculationRequest): TwoSampleCalculationResponse {
        val result: GeneralSampleSizeCalculationResult =
            generalSampleSizeCalculationService.calcSampleSize(request.toCalcParams())
        return result.splitProportionally(request.leftProportion)
    }

    private fun TwoSampleNonBinaryCalculationRequest.toCalcParams() = GeneralSampleSizeCalculationParams(
        alpha.div(100), beta.div(100), mde.div(100), variance, alternative
    )

    private fun GeneralSampleSizeCalculationResult.splitProportionally(leftProportion: BigDecimal): TwoSampleCalculationResponse {
        val left = sampleSize / (1 - leftProportion.div(100))
        val right = sampleSize / leftProportion.div(100)
        return TwoSampleCalculationResponse(left.toInt(), right.toInt())
    }

}
