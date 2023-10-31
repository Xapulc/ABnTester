package com.abntester.sample.twosample

import com.abntester.sample.GeneralSampleSizeNonBinaryCalculationService
import com.abntester.sample.common.SampleAlternative
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.assertAll
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.MethodSource
import java.math.BigDecimal

class TwoSampleCalculationServiceBinaryTest {

    private val twoSampleCalculationService = TwoSampleCalculationService(
        GeneralSampleSizeNonBinaryCalculationService(),
        TwoSampleBinarySizeCalculator()
    )


    @ParameterizedTest
    @MethodSource("binaryParams")
    fun `two sample binary test`(case: TwoSampleBinaryTestCase) {
        // given
        val request: TwoSampleBinaryCalculationRequest = case.toRequest()
        // when
        val result: TwoSampleCalculationResponse = twoSampleCalculationService.calcBinarySampleSize(request)
        // then
        assertAll(
            { assertEquals(case.expectedLeftSize, result.leftSampleSize) },
            { assertEquals(case.expectedRightSize, result.rightSampleSize) }
        )
    }

    data class TwoSampleBinaryTestCase(
        val alpha: BigDecimal,
        val beta: BigDecimal,
        val mde: BigDecimal,
        val p: BigDecimal,
        val leftProportion: BigDecimal,
        val alternative: SampleAlternative,
        val expectedLeftSize: Int,
        val expectedRightSize: Int,
    )

    private fun TwoSampleBinaryTestCase.toRequest() = TwoSampleBinaryCalculationRequest(
        alpha, beta, mde, p, leftProportion, alternative
    )

    companion object {
        @JvmStatic
        fun binaryParams(): List<TwoSampleBinaryTestCase> = listOf(
            TwoSampleBinaryTestCase(
                alpha = 5.toBigDecimal(),
                beta = 20.toBigDecimal(),
                mde = 1.toBigDecimal(),
                p = 10.toBigDecimal(),
                leftProportion = 50.toBigDecimal(),
                alternative = SampleAlternative.RIGHT_SIDED,
                expectedLeftSize = 11614,
                expectedRightSize = 11614
            ),
            TwoSampleBinaryTestCase(
                alpha = 1.toBigDecimal(),
                beta = 5.toBigDecimal(),
                mde = 7.toBigDecimal(),
                p = 80.toBigDecimal(),
                leftProportion = 35.toBigDecimal(),
                alternative = SampleAlternative.RIGHT_SIDED,
                expectedLeftSize = 676,
                expectedRightSize = 1254
            ),
            TwoSampleBinaryTestCase(
                alpha = 5.toBigDecimal(),
                beta = 20.toBigDecimal(),
                mde = 1.toBigDecimal(),
                p = 10.toBigDecimal(),
                leftProportion = 50.toBigDecimal(),
                alternative = SampleAlternative.TWO_SIDED,
                expectedLeftSize = 13488,
                expectedRightSize = 13488
            ),
            TwoSampleBinaryTestCase(
                alpha = 5.toBigDecimal(),
                beta = 20.toBigDecimal(),
                mde = 2.toBigDecimal(),
                p = 15.toBigDecimal(),
                leftProportion = 30.toBigDecimal(),
                alternative = SampleAlternative.LEFT_SIDED,
                expectedLeftSize = 2656,
                expectedRightSize = 6196
            ),
        )
    }
}
