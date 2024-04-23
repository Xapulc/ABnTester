package com.abntester.sample.validation

import com.abntester.sample.SampleSizeCalculationBaseRequest
import com.abntester.sample.common.SampleAlternative
import javax.validation.Constraint
import javax.validation.ConstraintValidator
import javax.validation.ConstraintValidatorContext
import javax.validation.Payload
import kotlin.reflect.KClass

@Target(AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
@MustBeDocumented
@Constraint(validatedBy = [UnsupportedTwoSidedValidator::class])
annotation class UnsupportedTwoSidedValidation(
    val message: String = "Расчет для двусторонней альтернативны не поддерживается",
    val groups: Array<KClass<*>> = [],
    val payload: Array<KClass<out Payload>> = [],
)

class UnsupportedTwoSidedValidator :
    ConstraintValidator<UnsupportedTwoSidedValidation, SampleSizeCalculationBaseRequest> {
    override fun isValid(value: SampleSizeCalculationBaseRequest?, context: ConstraintValidatorContext): Boolean {
        return value == null || value.alternative != SampleAlternative.TWO_SIDED
    }
}
