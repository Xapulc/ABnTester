package com.abntester.sample.onesample

import com.abntester.sample.GeneralSampleSizeCalculationService
import com.abntester.sample.SampleAlternative
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.assertAll
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.MethodSource
import java.math.BigDecimal

class OneSampleCalculationServiceBinaryTest {

    private val oneSampleCalculationService = OneSampleCalculationService(GeneralSampleSizeCalculationService())


    @ParameterizedTest
    @MethodSource("binaryParams")
    fun `one sample binary test`(case: OneSampleBinaryTestCase) {
        // given
        val request: OneSampleBinaryCalculationRequest = case.toRequest()
        // when
        val result: OneSampleCalculationResponse = oneSampleCalculationService.calcBinarySampleSize(request)
        // then
        assertAll(
            { assertEquals(case.expectedSize, result.sampleSize) },
        )
    }

    data class OneSampleBinaryTestCase(
        val alpha: BigDecimal,
        val beta: BigDecimal,
        val mde: BigDecimal,
        val p: BigDecimal,
        val alternative: SampleAlternative,
        val expectedSize: Int,
    )

    private fun OneSampleBinaryTestCase.toRequest() = OneSampleBinaryCalculationRequest(
        alpha, beta, mde, p, alternative
    )

    companion object {
        @JvmStatic
        fun binaryParams(): List<OneSampleBinaryTestCase> = listOf(
            OneSampleBinaryTestCase(
                alpha = 5.toBigDecimal(),
                beta = 20.toBigDecimal(),
                mde = 1.toBigDecimal(),
                p = 10.toBigDecimal(),
                alternative = SampleAlternative.RIGHT_SIDED,
                expectedSize = 6053,
            ),
            OneSampleBinaryTestCase(
                alpha = 3.toBigDecimal(),
                beta = 15.toBigDecimal(),
                mde = 5.toBigDecimal(),
                p = 60.toBigDecimal(),
                alternative = SampleAlternative.LEFT_SIDED,
                expectedSize = 843,
            ),
            OneSampleBinaryTestCase(
                alpha = 5.toBigDecimal(),
                beta = 20.toBigDecimal(),
                mde = 1.toBigDecimal(),
                p = 10.toBigDecimal(),
                alternative = SampleAlternative.TWO_SIDED,
                expectedSize = 7685,
            ),
            OneSampleBinaryTestCase(
                alpha = 0.5.toBigDecimal(),
                beta = 4.toBigDecimal(),
                mde = 8.3.toBigDecimal(),
                p = 40.toBigDecimal(),
                alternative = SampleAlternative.TWO_SIDED,
                expectedSize = 753,
            ),
        )
    }
}
