package com.abntester.sample

import com.abntester.utils.div
import com.abntester.utils.minus
import org.apache.commons.math3.distribution.NormalDistribution
import java.math.BigDecimal
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class GeneralSampleSizeCalculationService {

    companion object {
        val DEFAULT_NORMAL_DISTRIBUTION = NormalDistribution()
    }

    fun calcSampleSize(params: GeneralSampleSizeCalculationParams): GeneralSampleSizeCalculationResult {
        with(params) {
            val alphaCorrected = when (alternative) {
                SampleAlternative.LEFT_SIDED, SampleAlternative.RIGHT_SIDED -> alpha
                SampleAlternative.TWO_SIDED -> alpha / 2
            }
            val zOneMinusAlpha =
                DEFAULT_NORMAL_DISTRIBUTION.inverseCumulativeProbability((1 - alphaCorrected).toDouble()).toBigDecimal()
            val zBeta = DEFAULT_NORMAL_DISTRIBUTION.inverseCumulativeProbability(beta.toDouble()).toBigDecimal()
            val size = variance * (zOneMinusAlpha - zBeta).pow(2) / mde.pow(2)
            return GeneralSampleSizeCalculationResult(sampleSize = size)
        }
    }
}

data class GeneralSampleSizeCalculationParams(
    val alpha: BigDecimal,
    val beta: BigDecimal,
    val mde: BigDecimal,
    val variance: BigDecimal,
    val alternative: SampleAlternative,
)

enum class SampleAlternative {
    LEFT_SIDED, RIGHT_SIDED, TWO_SIDED
}

data class GeneralSampleSizeCalculationResult(
    val sampleSize: BigDecimal,
)
