package com.abntester.sample.twosample

import java.math.BigDecimal
import javax.validation.Valid
import javax.validation.constraints.DecimalMax
import javax.validation.constraints.DecimalMin
import javax.validation.constraints.Positive
import javax.ws.rs.Consumes
import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType

@Path("/api/two-sample/calculate")
class TwoSampleCalculationController constructor(private val twoSampleCalculationService: TwoSampleCalculationService) {

    @POST
    @Path("/binary")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    fun calculateBinarySampleSize(@Valid request: TwoSampleBinaryCalculationRequest): TwoSampleBinaryCalculationResponse {
        return twoSampleCalculationService.calcBinarySampleSize(request)
    }

}

data class TwoSampleBinaryCalculationRequest(
    @field:DecimalMin(value = "0", inclusive = false)
    @field:DecimalMax(value = "1", inclusive = false)
    val alpha: BigDecimal,
    @field:DecimalMin(value = "0", inclusive = false)
    @field:DecimalMax(value = "1", inclusive = false)
    val beta: BigDecimal,
    @field:Positive
    val mde: BigDecimal,
    @field:DecimalMin(value = "0", inclusive = false)
    @field:DecimalMax(value = "1", inclusive = false)
    val p: BigDecimal,
    @field:DecimalMin(value = "0", inclusive = false)
    @field:DecimalMax(value = "1", inclusive = false)
    val leftProportion: BigDecimal,
    val alternative: TwoSampleBinaryAlternative,
)

enum class TwoSampleBinaryAlternative {
    ONE_SIDED,
    TWO_SIDED
}

data class TwoSampleBinaryCalculationResponse(
    val leftSampleSize: Int,
    val rightSampleSize: Int,
)
