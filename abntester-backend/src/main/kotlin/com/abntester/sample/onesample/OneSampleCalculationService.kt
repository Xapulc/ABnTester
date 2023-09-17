package com.abntester.sample.onesample

import com.abntester.sample.GeneralSampleSizeNonBinaryCalculationService
import com.abntester.sample.common.BinarySampleSizeCalculationParams
import com.abntester.sample.common.GeneralSampleSizeCalculationResult
import com.abntester.sample.common.NonBinarySampleSizeCalculationParams
import com.abntester.utils.div
import java.math.RoundingMode
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class OneSampleCalculationService(
    private val generalSampleSizeNonBinaryCalculationService: GeneralSampleSizeNonBinaryCalculationService,
    private val oneSampleBinarySizeCalculator: OneSampleBinarySizeCalculator,
) {

    fun calcBinarySampleSize(request: OneSampleBinaryCalculationRequest): OneSampleCalculationResponse {
        val result: GeneralSampleSizeCalculationResult =
            oneSampleBinarySizeCalculator.calculate(request.toCalcParams())
        return OneSampleCalculationResponse(result.sampleSize.setScale(0, RoundingMode.CEILING).toInt())
    }

    private fun OneSampleBinaryCalculationRequest.toCalcParams() = BinarySampleSizeCalculationParams(
        alpha / 100, beta / 100, mde / 100, p / 100, alternative,
    )

    fun calcNonBinarySampleSize(request: OneSampleNonBinaryCalculationRequest): OneSampleCalculationResponse {
        val result: GeneralSampleSizeCalculationResult =
            generalSampleSizeNonBinaryCalculationService.calcSampleSize(request.toCalcParams())
        return OneSampleCalculationResponse(result.sampleSize.setScale(0, RoundingMode.CEILING).toInt())
    }

    private fun OneSampleNonBinaryCalculationRequest.toCalcParams() = NonBinarySampleSizeCalculationParams(
        alpha / 100, beta / 100, mde, variance, alternative
    )

}
