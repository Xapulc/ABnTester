package com.abntester.sample.onesample

import com.abntester.sample.GeneralSampleSizeCalculationParams
import com.abntester.sample.GeneralSampleSizeCalculationResult
import com.abntester.sample.GeneralSampleSizeCalculationService
import com.abntester.utils.minus
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class OneSampleCalculationService constructor(private val generalSampleSizeCalculationService: GeneralSampleSizeCalculationService) {

    fun calcBinarySampleSize(request: OneSampleBinaryCalculationRequest): OneSampleCalculationResponse {
        val result: GeneralSampleSizeCalculationResult =
            generalSampleSizeCalculationService.calcSampleSize(request.toCalcParams())
        return OneSampleCalculationResponse(result.sampleSize.toInt())
    }

    private fun OneSampleBinaryCalculationRequest.toCalcParams() = GeneralSampleSizeCalculationParams(
        alpha, beta, mde, p * (1 - p), alternative
    )

    fun calcNonBinarySampleSize(request: OneSampleNonBinaryCalculationRequest): OneSampleCalculationResponse {
        val result: GeneralSampleSizeCalculationResult =
            generalSampleSizeCalculationService.calcSampleSize(request.toCalcParams())
        return OneSampleCalculationResponse(result.sampleSize.toInt())
    }

    private fun OneSampleNonBinaryCalculationRequest.toCalcParams() = GeneralSampleSizeCalculationParams(
        alpha, beta, mde, variance, alternative
    )

}