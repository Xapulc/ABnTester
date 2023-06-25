package com.abntester.utils

import java.math.BigDecimal

operator fun Int.minus(bigDecimal: BigDecimal): BigDecimal {
    return this.toBigDecimal().minus(bigDecimal)
}

operator fun BigDecimal.div(int: Int): BigDecimal {
    return this.divide(int.toBigDecimal())
}

fun max(v1: BigDecimal, v2: BigDecimal): BigDecimal {
    return v1.max(v2)
}

fun max(v1: BigDecimal, v2: BigDecimal, v3: BigDecimal): BigDecimal {
    return v1.max(v2).max(v3)
}

