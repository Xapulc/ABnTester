package com.abntester.utils

import java.math.BigDecimal

operator fun Int.minus(bigDecimal: BigDecimal): BigDecimal {
    return this.toBigDecimal().minus(bigDecimal)
}

operator fun BigDecimal.div(int: Int) : BigDecimal {
    return this.divide(int.toBigDecimal())
}
