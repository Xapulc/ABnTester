package com.abntester.sample.common

import com.abntester.utils.div
import com.abntester.utils.max
import com.abntester.utils.min
import com.abntester.utils.minus
import java.math.BigDecimal
import kotlin.math.asin
import kotlin.math.sqrt

fun alphaCorrected(alpha: BigDecimal, alternative: SampleAlternative): BigDecimal {
    return when (alternative) {
        SampleAlternative.LEFT_SIDED, SampleAlternative.RIGHT_SIDED -> alpha
        SampleAlternative.TWO_SIDED -> alpha / 2
    }
}

fun resolveAlternativeVariance(
        alternative: SampleAlternative,
        p0: BigDecimal,
        mde: BigDecimal,
): BigDecimal {
    return when (alternative) {
        SampleAlternative.LEFT_SIDED -> alternativeVarianceForLeft(p0, mde)
        SampleAlternative.RIGHT_SIDED -> alternativeVarianceForRight(p0, mde)
        SampleAlternative.TWO_SIDED -> max(
                alternativeVarianceForLeft(p0, mde),
                alternativeVarianceForRight(p0, mde)
        )
    }
}

private fun alternativeVarianceForLeft(p0: BigDecimal, mde: BigDecimal): BigDecimal {
    return (p0 - mde) * (1 - (p0 - mde))
}

private fun alternativeVarianceForRight(p0: BigDecimal, mde: BigDecimal): BigDecimal {
    return (p0 + mde) * (1 - (p0 + mde))
}


fun normQuantile(v: BigDecimal) =
        DEFAULT_NORMAL_DISTRIBUTION.inverseCumulativeProbability(v.toDouble()).toBigDecimal()

private fun effectSizeForLeft(p0: BigDecimal, mde: BigDecimal) =
        (2 * (asin(sqrt(p0.toDouble())) - asin(sqrt((p0 - mde).toDouble())))).toBigDecimal()

private fun effectSizeForRight(p0: BigDecimal, mde: BigDecimal) =
        (2 * (asin(sqrt((p0 + mde).toDouble())) - asin(sqrt(p0.toDouble())))).toBigDecimal()


fun effectSize(p0: BigDecimal, mde: BigDecimal, alternative: SampleAlternative): BigDecimal {
    return when (alternative) {
        SampleAlternative.LEFT_SIDED -> effectSizeForLeft(p0, mde)
        SampleAlternative.RIGHT_SIDED -> effectSizeForRight(p0, mde)
        SampleAlternative.TWO_SIDED -> min(
                effectSizeForLeft(p0, mde),
                effectSizeForRight(p0, mde)
        )
    }
}