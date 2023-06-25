package com.abntester.sample.onesample

import com.abntester.sample.GeneralSampleSizeCalculationParams
import com.abntester.sample.GeneralSampleSizeCalculationResult
import com.abntester.sample.GeneralSampleSizeCalculationService
import com.abntester.utils.div
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
        alpha.div(100), beta.div(100), mde.div(100), p.div(100) * (1 - p.div(100)), alternative
    )

    fun calcNonBinarySampleSize(request: OneSampleNonBinaryCalculationRequest): OneSampleCalculationResponse {
        val result: GeneralSampleSizeCalculationResult =
            generalSampleSizeCalculationService.calcSampleSize(request.toCalcParams())
        return OneSampleCalculationResponse(result.sampleSize.toInt())
    }

    private fun OneSampleNonBinaryCalculationRequest.toCalcParams() = GeneralSampleSizeCalculationParams(
        alpha.div(100), beta.div(100), mde, variance, alternative
    )

}
