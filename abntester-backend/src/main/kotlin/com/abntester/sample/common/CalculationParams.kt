package com.abntester.sample.common

import org.apache.commons.math3.distribution.NormalDistribution
import java.math.BigDecimal


val DEFAULT_NORMAL_DISTRIBUTION = NormalDistribution()

open class BinarySampleSizeCalculationParams(
    open val alpha: BigDecimal,
    open val beta: BigDecimal,
    open val mde: BigDecimal,
    open val p: BigDecimal,
    open val alternative: SampleAlternative,
)

class TwoSampleBinarySampleSizeCalculationParams(
    override val alpha: BigDecimal,
    override val beta: BigDecimal,
    override val mde: BigDecimal,
    override val p: BigDecimal,
    override val alternative: SampleAlternative,
    val leftProportion: BigDecimal,
) : BinarySampleSizeCalculationParams(alpha, beta, mde, p, alternative)

data class NonBinarySampleSizeCalculationParams(
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
