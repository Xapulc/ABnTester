package com.abntester.sample

import com.abntester.sample.common.GeneralSampleSizeCalculationResult
import com.abntester.sample.common.NonBinarySampleSizeCalculationParams
import com.abntester.sample.common.alphaCorrected
import com.abntester.sample.common.normQuantile
import com.abntester.utils.minus
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class GeneralSampleSizeNonBinaryCalculationService {

    fun calcSampleSize(params: NonBinarySampleSizeCalculationParams): GeneralSampleSizeCalculationResult {
        with(params) {
            val alphaCorrected = alphaCorrected(alpha, alternative)
            val zOneMinusAlpha = normQuantile(1 - alphaCorrected)
            val zOneMinusBeta = normQuantile(1 - beta)
            val size = variance * (zOneMinusAlpha + zOneMinusBeta).pow(2) / mde.pow(2)
            return GeneralSampleSizeCalculationResult(sampleSize = size)
        }
    }
}

