package com.abntester.sample.twosample

import com.abntester.sample.GeneralSampleSizeCalculationParams
import com.abntester.sample.GeneralSampleSizeCalculationResult
import com.abntester.sample.GeneralSampleSizeCalculationService
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
        alpha, beta, mde, p * (1 - p), alternative
    )

    fun calcNonBinarySampleSize(request: TwoSampleNonBinaryCalculationRequest): TwoSampleCalculationResponse {
        val result: GeneralSampleSizeCalculationResult =
            generalSampleSizeCalculationService.calcSampleSize(request.toCalcParams())
        return result.splitProportionally(request.leftProportion)
    }

    private fun TwoSampleNonBinaryCalculationRequest.toCalcParams() = GeneralSampleSizeCalculationParams(
        alpha, beta, mde, variance, alternative
    )

    private fun GeneralSampleSizeCalculationResult.splitProportionally(leftProportion: BigDecimal): TwoSampleCalculationResponse {
        val left = sampleSize / (1 - leftProportion)
        val right = sampleSize / leftProportion
        return TwoSampleCalculationResponse(left.toInt(), right.toInt())
    }

}