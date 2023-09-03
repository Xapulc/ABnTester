package com.abntester.sample.twosample

import com.abntester.sample.GeneralSampleSizeCalculationParams
import com.abntester.sample.GeneralSampleSizeCalculationResult
import com.abntester.sample.GeneralSampleSizeCalculationService
import com.abntester.sample.SampleAlternative
import com.abntester.utils.div
import com.abntester.utils.max
import com.abntester.utils.minus
import java.math.BigDecimal
import java.math.RoundingMode
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class TwoSampleCalculationService(private val generalSampleSizeCalculationService: GeneralSampleSizeCalculationService) {

    fun calcBinarySampleSize(request: TwoSampleBinaryCalculationRequest): TwoSampleCalculationResponse {
        val result: GeneralSampleSizeCalculationResult =
            generalSampleSizeCalculationService.calcSampleSize(request.toCalcParams())
        return result.splitProportionally(request.leftProportion)
    }

    private fun TwoSampleBinaryCalculationRequest.toCalcParams() = GeneralSampleSizeCalculationParams(
        alpha / 100, beta / 100, mde / 100, resolveVariance(), alternative
    )

    private fun TwoSampleBinaryCalculationRequest.resolveVariance(): BigDecimal {
        return when (alternative) {
            SampleAlternative.LEFT_SIDED -> calcLeftWeightedVariance()
            SampleAlternative.RIGHT_SIDED -> calcRightWeightedVariance()
            SampleAlternative.TWO_SIDED -> max(calcRightWeightedVariance(), calcLeftWeightedVariance())
        }
    }

    private fun TwoSampleBinaryCalculationRequest.calcRightWeightedVariance(): BigDecimal {
        val p100: BigDecimal = p / 100
        val mde100: BigDecimal = mde / 100
        val leftProportion100 = leftProportion / 100
        val v1: BigDecimal = p100 * (1 - p100)
        val v2: BigDecimal = (1 - leftProportion100) * v1 + leftProportion100 * (p100 + mde100) * (1 - (p100 + mde100))
        val v3: BigDecimal = (1 - leftProportion100) * (p100 - mde100) * (1 - (p100 - mde100)) + leftProportion100 * v1
        return max(v1, v2, v3)
    }

    private fun TwoSampleBinaryCalculationRequest.calcLeftWeightedVariance(): BigDecimal {
        val p100: BigDecimal = p / 100
        val mde100: BigDecimal = mde / 100
        val leftProportion100 = leftProportion / 100
        val v1: BigDecimal = p100 * (1 - p100)
        val v2: BigDecimal = (1 - leftProportion100) * (p100 + mde100) * (1 - (p100 + mde100)) + leftProportion100 * v1
        val v3: BigDecimal = (1 - leftProportion100) * v1 + leftProportion100 * (p100 - mde100) * (1 - (p100 - mde100))
        return max(v1, v2, v3)
    }

    fun calcNonBinarySampleSize(request: TwoSampleNonBinaryCalculationRequest): TwoSampleCalculationResponse {
        val result: GeneralSampleSizeCalculationResult =
            generalSampleSizeCalculationService.calcSampleSize(request.toCalcParams())
        return result.splitProportionally(request.leftProportion)
    }

    private fun TwoSampleNonBinaryCalculationRequest.toCalcParams() = GeneralSampleSizeCalculationParams(
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
