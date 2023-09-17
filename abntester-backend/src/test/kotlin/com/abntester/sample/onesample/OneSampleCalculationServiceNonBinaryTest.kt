package com.abntester.sample.onesample

import com.abntester.sample.GeneralSampleSizeNonBinaryCalculationService
import com.abntester.sample.common.SampleAlternative
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.assertAll
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.MethodSource
import java.math.BigDecimal

class OneSampleCalculationServiceNonBinaryTest {

    private val oneSampleCalculationService = OneSampleCalculationService(
        GeneralSampleSizeNonBinaryCalculationService(),
        OneSampleBinarySizeCalculator()
    )


    @ParameterizedTest
    @MethodSource("nonBinaryParams")
    fun `one sample non binary test`(case: OneSampleNonBinaryTestCase) {
        // given
        val request: OneSampleNonBinaryCalculationRequest = case.toRequest()
        // when
        val result: OneSampleCalculationResponse = oneSampleCalculationService.calcNonBinarySampleSize(request)
        // then
        assertAll(
            { assertEquals(case.expectedSize, result.sampleSize) },
        )
    }

    data class OneSampleNonBinaryTestCase(
        val alpha: BigDecimal,
        val beta: BigDecimal,
        val mde: BigDecimal,
        val variance: BigDecimal,
        val alternative: SampleAlternative,
        val expectedSize: Int,
    )

    private fun OneSampleNonBinaryTestCase.toRequest() = OneSampleNonBinaryCalculationRequest(
        alpha, beta, mde, variance, alternative
    )

    companion object {
        @JvmStatic
        fun nonBinaryParams(): List<OneSampleNonBinaryTestCase> = listOf(
            OneSampleNonBinaryTestCase(
                alpha = 5.toBigDecimal(),
                beta = 20.toBigDecimal(),
                mde = 1.toBigDecimal(),
                variance = 100.toBigDecimal(),
                alternative = SampleAlternative.RIGHT_SIDED,
                expectedSize = 619,
            ),
            OneSampleNonBinaryTestCase(
                alpha = 10.toBigDecimal(),
                beta = 57.toBigDecimal(),
                mde = 0.01.toBigDecimal(),
                variance = 123.8.toBigDecimal(),
                alternative = SampleAlternative.RIGHT_SIDED,
                expectedSize = 1512115,
            ),
            OneSampleNonBinaryTestCase(
                alpha = 5.toBigDecimal(),
                beta = 20.toBigDecimal(),
                mde = 1.toBigDecimal(),
                variance = 100.toBigDecimal(),
                alternative = SampleAlternative.TWO_SIDED,
                expectedSize = 785,
            ),
            OneSampleNonBinaryTestCase(
                alpha = 0.01.toBigDecimal(),
                beta = 0.09.toBigDecimal(),
                mde = 104.toBigDecimal(),
                variance = 123456.toBigDecimal(),
                alternative = SampleAlternative.LEFT_SIDED,
                expectedSize = 535,
            ),
        )
    }
}
