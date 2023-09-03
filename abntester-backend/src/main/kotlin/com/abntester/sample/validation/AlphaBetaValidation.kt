package com.abntester.sample.validation

import com.abntester.sample.SampleSizeCalculationBaseRequest
import com.abntester.utils.ONE_HUNDRED
import javax.validation.Constraint
import javax.validation.ConstraintValidator
import javax.validation.ConstraintValidatorContext
import javax.validation.Payload
import kotlin.reflect.KClass

@Target(AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
@MustBeDocumented
@Constraint(validatedBy = [AlphaBetaValidator::class])
annotation class AlphaBetaValidation(
    val message: String = "Не выполнено условие: alpha+beta < 100%",
    val groups: Array<KClass<*>> = [],
    val payload: Array<KClass<out Payload>> = [],
)

class AlphaBetaValidator : ConstraintValidator<AlphaBetaValidation, SampleSizeCalculationBaseRequest> {
    override fun isValid(value: SampleSizeCalculationBaseRequest?, context: ConstraintValidatorContext): Boolean {
        return when {
            value == null -> true
            (value.alpha + value.beta) >= ONE_HUNDRED -> false
            else -> true
        }
    }
}
