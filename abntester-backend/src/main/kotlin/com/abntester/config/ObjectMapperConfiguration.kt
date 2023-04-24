package com.abntester.config

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import io.quarkus.jackson.ObjectMapperCustomizer
import javax.enterprise.inject.Instance
import javax.enterprise.inject.Produces
import javax.inject.Singleton

class ObjectMapperConfiguration {

    @Singleton
    @Produces
    fun objectMapper(customizers: Instance<ObjectMapperCustomizer>): ObjectMapper {
        val mapper = ObjectMapper()
        mapper.registerKotlinModule()
        mapper.disable(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES)
        mapper.disable(DeserializationFeature.FAIL_ON_NULL_CREATOR_PROPERTIES)
        mapper.disable(DeserializationFeature.FAIL_ON_MISSING_CREATOR_PROPERTIES)
        mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
        for (customizer in customizers) {
            customizer.customize(mapper)
        }
        return mapper
    }

}
