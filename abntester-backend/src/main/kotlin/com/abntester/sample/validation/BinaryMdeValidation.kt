package com.abntester.sample.validation

import com.abntester.sample.SampleSizeCalculationBinaryBaseRequest
import com.abntester.sample.common.SampleAlternative
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
        if (value == null) {
            return true
        }
        if (value.mde > ONE_HUNDRED) {
            return applyMdeInvalidMessage("Не выполнено условие: MDE <= 100%", context)
        }
        if (value.alternative != SampleAlternative.RIGHT_SIDED && value.mde >= value.p) {
            return applyMdeInvalidMessage(
                "Не выполнено условие: MDE < p",
                context
            )
        }
        if (value.alternative != SampleAlternative.LEFT_SIDED && value.mde >= (BigDecimal.valueOf(100) - value.p)) {
            return applyMdeInvalidMessage(
                "Не выполнено условие: MDE < (1 - p)",
                context
            )
        }
        return true
    }

    private fun applyMdeInvalidMessage(errorMsg: String, context: ConstraintValidatorContext): Boolean {
        context.apply {
            disableDefaultConstraintViolation()
            buildConstraintViolationWithTemplate(errorMsg)
                .addConstraintViolation()
        }
        return false
    }
}
