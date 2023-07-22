package com.abntester.sample.twosample

import com.abntester.sample.GeneralSampleSizeCalculationService
import com.abntester.sample.SampleAlternative
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.assertAll
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.MethodSource
import java.math.BigDecimal

class TwoSampleCalculationServiceNonBinaryTest {

    private val twoSampleCalculationService = TwoSampleCalculationService(GeneralSampleSizeCalculationService())


    @ParameterizedTest
    @MethodSource("nonBinaryParams")
    fun `two sample non binary test`(case: TwoSampleNonBinaryTestCase) {
        // given
        val request: TwoSampleNonBinaryCalculationRequest = case.toRequest()
        // when
        val result: TwoSampleCalculationResponse = twoSampleCalculationService.calcNonBinarySampleSize(request)
        // then
        assertAll(
            { assertEquals(case.expectedLeftSize, result.leftSampleSize) },
            { assertEquals(case.expectedRightSize, result.rightSampleSize) }
        )
    }

    data class TwoSampleNonBinaryTestCase(
        val alpha: BigDecimal,
        val beta: BigDecimal,
        val mde: BigDecimal,
        val variance: BigDecimal,
        val leftProportion: BigDecimal,
        val alternative: SampleAlternative,
        val expectedLeftSize: Int,
        val expectedRightSize: Int,
    )

    private fun TwoSampleNonBinaryTestCase.toRequest() = TwoSampleNonBinaryCalculationRequest(
        alpha, beta, mde, variance, leftProportion, alternative
    )

    companion object {
        @JvmStatic
        fun nonBinaryParams(): List<TwoSampleNonBinaryTestCase> = listOf(
            TwoSampleNonBinaryTestCase(
                alpha = 5.toBigDecimal(),
                beta = 20.toBigDecimal(),
                mde = 1.toBigDecimal(),
                variance = 100.toBigDecimal(),
                leftProportion = 50.toBigDecimal(),
                alternative = SampleAlternative.RIGHT_SIDED,
                expectedLeftSize = 1237,
                expectedRightSize = 1237
            ),
            TwoSampleNonBinaryTestCase(
                alpha = 1.4.toBigDecimal(),
                beta = 0.8.toBigDecimal(),
                mde = 1.5.toBigDecimal(),
                variance = 1234.toBigDecimal(),
                leftProportion = 8.toBigDecimal(),
                alternative = SampleAlternative.RIGHT_SIDED,
                expectedLeftSize = 12649,
                expectedRightSize = 145455
            ),
            TwoSampleNonBinaryTestCase(
                alpha = 5.toBigDecimal(),
                beta = 20.toBigDecimal(),
                mde = 1.toBigDecimal(),
                variance = 100.toBigDecimal(),
                leftProportion = 50.toBigDecimal(),
                alternative = SampleAlternative.TWO_SIDED,
                expectedLeftSize = 1570,
                expectedRightSize = 1570
            ),
            TwoSampleNonBinaryTestCase(
                alpha = 2.toBigDecimal(),
                beta = 1.toBigDecimal(),
                mde = 7.toBigDecimal(),
                variance = 1000.toBigDecimal(),
                leftProportion = 30.toBigDecimal(),
                alternative = SampleAlternative.LEFT_SIDED,
                expectedLeftSize = 560,
                expectedRightSize = 1306
            ),
        )
    }
}
