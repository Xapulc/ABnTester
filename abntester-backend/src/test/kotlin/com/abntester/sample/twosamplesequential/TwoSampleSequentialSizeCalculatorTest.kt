package com.abntester.sample.twosamplesequential

import com.abntester.sample.common.BinarySampleSizeCalculationParams
import com.abntester.sample.common.SampleAlternative
import com.abntester.sample.sequential.calculation.MaxSequentialSampleSizeCalculator
import com.abntester.sample.sequential.calculation.SequentialSampleSizeCalculator
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertAll

class TwoSampleSequentialSizeCalculatorTest {

    private val twoSampleSequentialCalculator = TwoSampleSequentialSizeCalculator(
        SequentialSampleSizeCalculator(), MaxSequentialSampleSizeCalculator()
    )

    @Test
    fun calcTwoSampleSequentialSize_leftSidedTest() {
        // given
        val params = BinarySampleSizeCalculationParams(
            0.05.toBigDecimal(),
            0.2.toBigDecimal(),
            0.01.toBigDecimal(),
            0.1.toBigDecimal(),
            SampleAlternative.LEFT_SIDED
        )
        // when
        val result: TwoSampleSequentialSize = twoSampleSequentialCalculator.calcTwoSampleSequentialSize(params)
        // then
        assertAll(
            { assertEquals(TwoSampleSize(4611, 4611), result.hypothesis) },
            { assertEquals(TwoSampleSize(6559, 6559), result.alternative) },
            { assertEquals(TwoSampleSize(7628, 7628), result.max) }
        )
    }

    @Test
    fun calcTwoSampleSequentialSize_rightSidedTest() {
        // given
        val params = BinarySampleSizeCalculationParams(
            0.05.toBigDecimal(),
            0.2.toBigDecimal(),
            0.01.toBigDecimal(),
            0.1.toBigDecimal(),
            SampleAlternative.RIGHT_SIDED
        )
        // when
        val result: TwoSampleSequentialSize = twoSampleSequentialCalculator.calcTwoSampleSequentialSize(params)
        // then
        assertAll(
            { assertEquals(TwoSampleSize(5043, 5043), result.hypothesis) },
            { assertEquals(TwoSampleSize(7165, 7165), result.alternative) },
            { assertEquals(TwoSampleSize(8336, 8336), result.max) }
        )
    }
}
