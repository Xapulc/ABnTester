package com.abntester.sample

import java.math.BigDecimal

interface SampleSizeCalculationBaseRequest {
    val alpha: BigDecimal
    val beta: BigDecimal
    val mde: BigDecimal
    val alternative: SampleAlternative
}

interface SampleSizeCalculationBinaryBaseRequest : SampleSizeCalculationBaseRequest {
    val p: BigDecimal
}

interface SampleSizeCalculationNonBinaryBaseRequest : SampleSizeCalculationBaseRequest {
    val variance: BigDecimal
}
