package com.abntester.sample.onesample

import com.abntester.sample.SampleAlternative
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

@Path("/api/one-sample/calculate")
class OneSampleCalculationController constructor(private val oneSampleCalculationService: OneSampleCalculationService) {


    @POST
    @Path("/binary")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    fun calculateBinarySampleSize(@Valid request: OneSampleBinaryCalculationRequest): OneSampleCalculationResponse {
        return oneSampleCalculationService.calcBinarySampleSize(request)
    }

    @POST
    @Path("/non-binary")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    fun calculateNonBinarySampleSize(@Valid request: OneSampleNonBinaryCalculationRequest): OneSampleCalculationResponse {
        return oneSampleCalculationService.calcNonBinarySampleSize(request)
    }
}

data class OneSampleBinaryCalculationRequest(
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
    val alternative: SampleAlternative,
)

data class OneSampleNonBinaryCalculationRequest(
    @field:DecimalMin(value = "0", inclusive = false)
    @field:DecimalMax(value = "1", inclusive = false)
    val alpha: BigDecimal,
    @field:DecimalMin(value = "0", inclusive = false)
    @field:DecimalMax(value = "1", inclusive = false)
    val beta: BigDecimal,
    @field:Positive
    val mde: BigDecimal,
    @field:Positive
    val variance: BigDecimal,
    val alternative: SampleAlternative,
)

data class OneSampleCalculationResponse(
    val sampleSize: Int,
)

