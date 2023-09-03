package com.abntester.sample.validation

import com.abntester.sample.SampleSizeCalculationBinaryBaseRequest
import com.abntester.utils.ONE_HUNDRED
import java.math.BigDecimal
import javax.validation.Constraint
import javax.validation.ConstraintValidator
import javax.validation.ConstraintValidatorContext
import javax.validation.Payload
import kotlin.reflect.KClass

@Target(AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
@MustBeDocumented
@Constraint(validatedBy = [BinaryMdeValidator::class])
annotation class BinaryMdeValidation(
    val message: String = "invalid",
    val groups: Array<KClass<*>> = [],
    val payload: Array<KClass<out Payload>> = [],
)


class BinaryMdeValidator : ConstraintValidator<BinaryMdeValidation, SampleSizeCalculationBinaryBaseRequest> {
    override fun isValid(
        value: SampleSizeCalculationBinaryBaseRequest?,
        context: ConstraintValidatorContext,
    ): Boolean {
        return when {
            value == null -> true
            value.mde > ONE_HUNDRED -> returnWithMdeInvalidMessage("Не выполнено условие: MDE <= 100%", context)
            value.mde >= value.p -> returnWithMdeInvalidMessage("Не выполнено условие: MDE < p", context)
            value.mde >= (BigDecimal.ONE - value.p) -> returnWithMdeInvalidMessage(
                "Не выполнено условие: MDE < (1 - p)",
                context
            )

            else -> true
        }
    }

    private fun returnWithMdeInvalidMessage(errorMsg: String, context: ConstraintValidatorContext): Boolean {
        context.apply {
            disableDefaultConstraintViolation()
            buildConstraintViolationWithTemplate(errorMsg)
                .addConstraintViolation()
        }
        return false
    }
}
