package com.abntester.sample.onesamplesequential

import com.abntester.sample.common.BinarySampleSizeCalculationParams
import com.abntester.sample.common.SampleAlternative
import com.abntester.sample.sequential.calculation.MaxSequentialSampleSizeCalculator
import com.abntester.sample.sequential.calculation.SequentialSampleSizeCalculator
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertAll

class OneSampleSequentialCalculatorTest {

    private val oneSampleSequentialCalculator = OneSampleSequentialCalculator(
        SequentialSampleSizeCalculator(), MaxSequentialSampleSizeCalculator()
    )

    @Test
    fun calcSequentialSampleSize_leftSidedTest() {
        // given
        val params = BinarySampleSizeCalculationParams(
            0.05.toBigDecimal(),
            0.2.toBigDecimal(),
            0.01.toBigDecimal(),
            0.1.toBigDecimal(),
            SampleAlternative.LEFT_SIDED
        )
        // when
        val result: SequentialSampleSize = oneSampleSequentialCalculator.calcSequentialSampleSize(params)
        // then
        assertAll(
            {assertEquals(2270, result.hypothesisSampleSize)},
            {assertEquals(3328, result.alternativeSampleSize)},
            {assertEquals(3829, result.maxSampleSize)}
        )
    }

    @Test
    fun calcSequentialSampleSize_rightSidedTest() {
        // given
        val params = BinarySampleSizeCalculationParams(
            0.05.toBigDecimal(),
            0.2.toBigDecimal(),
            0.01.toBigDecimal(),
            0.1.toBigDecimal(),
            SampleAlternative.RIGHT_SIDED
        )
        // when
        val result: SequentialSampleSize = oneSampleSequentialCalculator.calcSequentialSampleSize(params)
        // then
        assertAll(
            {assertEquals(2556, result.hypothesisSampleSize)},
            {assertEquals(3532, result.alternativeSampleSize)},
            {assertEquals(4153, result.maxSampleSize)}
        )
    }
}
