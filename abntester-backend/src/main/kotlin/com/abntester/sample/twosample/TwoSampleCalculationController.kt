package com.abntester.sample.twosample

import com.abntester.sample.SampleAlternative
import com.abntester.sample.SampleSizeCalculationBinaryBaseRequest
import com.abntester.sample.SampleSizeCalculationNonBinaryBaseRequest
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
    fun calculateBinarySampleSize(@Valid request: TwoSampleBinaryCalculationRequest): TwoSampleCalculationResponse {
        return twoSampleCalculationService.calcBinarySampleSize(request)
    }

    @POST
    @Path("/non-binary")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    fun calculateNonBinarySampleSize(@Valid request: TwoSampleNonBinaryCalculationRequest): TwoSampleCalculationResponse {
        return twoSampleCalculationService.calcNonBinarySampleSize(request)
    }

}

data class TwoSampleBinaryCalculationRequest(
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
    @field:DecimalMin(value = "0", inclusive = false)
    @field:DecimalMax(value = "100", inclusive = false)
    val leftProportion: BigDecimal,
    override val alternative: SampleAlternative,
) : SampleSizeCalculationBinaryBaseRequest

data class TwoSampleNonBinaryCalculationRequest(
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
    @field:DecimalMin(value = "0", inclusive = false)
    @field:DecimalMax(value = "100", inclusive = false)
    val leftProportion: BigDecimal,
    override val alternative: SampleAlternative,
) : SampleSizeCalculationNonBinaryBaseRequest

data class TwoSampleCalculationResponse(
    val leftSampleSize: Int,
    val rightSampleSize: Int,
)
