package com.abntester.sample.twosample

import com.abntester.sample.GeneralSampleSizeNonBinaryCalculationService
import com.abntester.sample.common.GeneralSampleSizeCalculationResult
import com.abntester.sample.common.NonBinarySampleSizeCalculationParams
import com.abntester.sample.common.TwoSampleBinarySampleSizeCalculationParams
import com.abntester.utils.div
import com.abntester.utils.minus
import java.math.BigDecimal
import java.math.RoundingMode
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class TwoSampleCalculationService(
    private val generalSampleSizeNonBinaryCalculationService: GeneralSampleSizeNonBinaryCalculationService,
    private val twoSampleBinarySizeCalculator: TwoSampleBinarySizeCalculator,
) {

    fun calcBinarySampleSize(request: TwoSampleBinaryCalculationRequest): TwoSampleCalculationResponse {
        val result: GeneralSampleSizeCalculationResult =
            twoSampleBinarySizeCalculator.calculate(request.toCalcParams())
        return result.splitProportionally(request.leftProportion)
    }

    private fun TwoSampleBinaryCalculationRequest.toCalcParams() = TwoSampleBinarySampleSizeCalculationParams(
        alpha / 100, beta / 100, mde / 100, p / 100, alternative, leftProportion / 100
    )

    fun calcNonBinarySampleSize(request: TwoSampleNonBinaryCalculationRequest): TwoSampleCalculationResponse {
        val result: GeneralSampleSizeCalculationResult =
            generalSampleSizeNonBinaryCalculationService.calcSampleSize(request.toCalcParams())
        return result.splitProportionally(request.leftProportion)
    }

    private fun TwoSampleNonBinaryCalculationRequest.toCalcParams() = NonBinarySampleSizeCalculationParams(
        alpha / 100, beta / 100, mde, variance, alternative
    )

    private fun GeneralSampleSizeCalculationResult.splitProportionally(leftProportion: BigDecimal): TwoSampleCalculationResponse {
        val left = sampleSize / (1 - leftProportion / 100)
        val right = sampleSize / (leftProportion / 100)
        return TwoSampleCalculationResponse(
            left.setScale(0, RoundingMode.CEILING).toInt(),
            right.setScale(0, RoundingMode.CEILING).toInt()
        )
    }

}
