package com.abntester.sample.onesamplesequential

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

@Path("/api/one-sample-sequential/calculate")
class OneSampleSequentialController(
    private val oneSampleSequentialCalculationService: OneSampleSequentialCalculationService
) {
    @POST
    @Path("/binary")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    fun calculateBinarySampleSize(@Valid request: OneSampleBinaryCalculationRequest): OneSampleCalculationResponse {
        return oneSampleSequentialCalculationService.calcBinarySampleSize(request)
    }
}

@AlphaBetaValidation
@BinaryMdeValidation
@UnsupportedTwoSidedValidation
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

data class OneSampleCalculationResponse(
    val hypothesisSampleSize: Int,
    val alternativeSampleSize: Int,
    val maxSampleSize: Int,
)

