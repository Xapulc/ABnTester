package com.abntester.sample.common

import com.abntester.utils.div
import com.abntester.utils.max
import com.abntester.utils.minus
import java.math.BigDecimal

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
