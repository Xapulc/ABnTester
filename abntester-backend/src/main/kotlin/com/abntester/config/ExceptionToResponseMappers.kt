package com.abntester.config

import com.fasterxml.jackson.databind.exc.InvalidFormatException
import com.fasterxml.jackson.module.kotlin.MissingKotlinParameterException
import javax.validation.ConstraintViolationException
import javax.validation.Path
import javax.ws.rs.core.Response
import javax.ws.rs.ext.ExceptionMapper
import javax.ws.rs.ext.Provider

@Provider
class ConstraintViolationExceptionToResponseMapper : ExceptionMapper<ConstraintViolationException> {
    override fun toResponse(exception: ConstraintViolationException): Response {
        val message = exception.constraintViolations.map { "${it.propertyPath.getAllInsteadFirstTwo()} ${it.message}" }
            .joinToString(separator = "; ") { it }
        return message.toBadRequestResponse()
    }

    private fun Path.getAllInsteadFirstTwo(): String {
        return drop(2).map { it.name }.joinToString(separator = ".") { it }
    }
}


// @field:NotNull not working correctly, looks like similar to https://github.com/OpenAPITools/openapi-generator/issues/5121
@Provider
class MissingKotlinParameterExceptionToResponseMapper : ExceptionMapper<MissingKotlinParameterException> {
    override fun toResponse(exception: MissingKotlinParameterException): Response {
        val message = "не заполнен обязательный параметр - ${exception.parameter.name}"
        return message.toBadRequestResponse()
    }

}

@Provider
class InvalidFormatExceptionToResponseParameter : ExceptionMapper<InvalidFormatException> {
    override fun toResponse(exception: InvalidFormatException): Response {
        val message = "недопустимое значение '${exception.value}' для поля ${exception.path.first().fieldName}"
        return message.toBadRequestResponse()
    }

}

private fun String.toBadRequestResponse() = Response.status(400)
    .entity(ErrorResponse(this))
    .build()

data class ErrorResponse(
    val error: String,
)

