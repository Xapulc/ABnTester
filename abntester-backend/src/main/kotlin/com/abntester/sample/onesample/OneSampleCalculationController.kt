package com.abntester.sample.onesample

import com.abntester.sample.SampleSizeCalculationBinaryBaseRequest
import com.abntester.sample.SampleSizeCalculationNonBinaryBaseRequest
import com.abntester.sample.common.SampleAlternative
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
class OneSampleCalculationController(private val oneSampleCalculationService: OneSampleCalculationService) {


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
    @field:DecimalMax(value = "100", inclusive = false)
    override val alpha: BigDecimal,
    @field:DecimalMin(value = "0", inclusive = false)
    @field:DecimalMax(value = "100", inclusive = false)
    override val beta: BigDecimal,
    @field:Positive
    override val mde: BigDecimal,
    @field:DecimalMin(value = "0", inclusive = false)
    @field:DecimalMax(value = "100", inclusive = false)
    override val p: BigDecimal,
    override val alternative: SampleAlternative,
) : SampleSizeCalculationBinaryBaseRequest

data class OneSampleNonBinaryCalculationRequest(
    @field:DecimalMin(value = "0", inclusive = false)
    @field:DecimalMax(value = "100", inclusive = false)
    override val alpha: BigDecimal,
    @field:DecimalMin(value = "0", inclusive = false)
    @field:DecimalMax(value = "100", inclusive = false)
    override val beta: BigDecimal,
    @field:Positive
    override val mde: BigDecimal,
    @field:Positive
    override val variance: BigDecimal,
    override val alternative: SampleAlternative,
) : SampleSizeCalculationNonBinaryBaseRequest

data class OneSampleCalculationResponse(
    val sampleSize: Int,
)

