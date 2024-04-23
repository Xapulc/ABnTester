package com.abntester.sample.twosamplesequential

import com.abntester.sample.SampleSizeCalculationBinaryBaseRequest
import com.abntester.sample.common.SampleAlternative
import com.abntester.sample.validation.AlphaBetaValidation
import com.abntester.sample.validation.BinaryMdeValidation
import com.abntester.sample.validation.UnsupportedTwoSidedValidation
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

@Path("/api/two-sample-sequential/calculate")
class TwoSampleSequentialController(
    private val twoSampleSequentialCalculationService: TwoSampleSequentialCalculationService
) {
    @POST
    @Path("/binary")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    fun calculateBinarySampleSize(@Valid request: TwoSampleBinaryCalculationRequest): TwoSampleCalculationResponse {
        return twoSampleSequentialCalculationService.calcBinarySampleSize(request)
    }
}

@AlphaBetaValidation
@BinaryMdeValidation
@UnsupportedTwoSidedValidation
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
    override val alternative: SampleAlternative,
) : SampleSizeCalculationBinaryBaseRequest

data class TwoSampleCalculationResponse(
    val hypothesis: TwoSampleSizeDto,
    val alternative: TwoSampleSizeDto,
    val max: TwoSampleSizeDto,
)

data class TwoSampleSizeDto(
    val leftSampleSize: Int,
    val rightSampleSize: Int,
)

