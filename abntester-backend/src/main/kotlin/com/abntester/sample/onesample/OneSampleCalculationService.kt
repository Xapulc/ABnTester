package com.abntester.sample.onesample

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
class OneSampleCalculationService constructor(private val generalSampleSizeCalculationService: GeneralSampleSizeCalculationService) {

    fun calcBinarySampleSize(request: OneSampleBinaryCalculationRequest): OneSampleCalculationResponse {
        val result: GeneralSampleSizeCalculationResult =
            generalSampleSizeCalculationService.calcSampleSize(request.toCalcParams())
        return OneSampleCalculationResponse(result.sampleSize.setScale(0, RoundingMode.CEILING).toInt())
    }

    private fun OneSampleBinaryCalculationRequest.toCalcParams() = GeneralSampleSizeCalculationParams(
        alpha / 100, beta / 100, mde / 100, resolveVariance(), alternative
    )

    private fun OneSampleBinaryCalculationRequest.resolveVariance(): BigDecimal {
        return when (alternative) {
            SampleAlternative.LEFT_SIDED -> calcLeftWeightedVariance()
            SampleAlternative.RIGHT_SIDED -> calcRightWeightedVariance()
            SampleAlternative.TWO_SIDED -> max(calcLeftWeightedVariance(), calcRightWeightedVariance())
        }
    }

    private fun OneSampleBinaryCalculationRequest.calcRightWeightedVariance(): BigDecimal {
        val p100: BigDecimal = p / 100
        val mde100: BigDecimal = mde / 100
        val v1: BigDecimal = p100 * (1 - p100)
        val v2: BigDecimal = (p100 + mde100) * (1 - (p100 + mde100))
        return max(v1, v2)
    }

    private fun OneSampleBinaryCalculationRequest.calcLeftWeightedVariance(): BigDecimal {
        val p100: BigDecimal = p / 100
        val mde100: BigDecimal = mde / 100
        val v1: BigDecimal = p100 * (1 - p100)
        val v2: BigDecimal = (p100 - mde100) * (1 - (p100 - mde100))
        return max(v1, v2)
    }

    fun calcNonBinarySampleSize(request: OneSampleNonBinaryCalculationRequest): OneSampleCalculationResponse {
        val result: GeneralSampleSizeCalculationResult =
            generalSampleSizeCalculationService.calcSampleSize(request.toCalcParams())
        return OneSampleCalculationResponse(result.sampleSize.setScale(0, RoundingMode.CEILING).toInt())
    }

    private fun OneSampleNonBinaryCalculationRequest.toCalcParams() = GeneralSampleSizeCalculationParams(
        alpha / 100, beta / 100, mde, variance, alternative
    )

}
