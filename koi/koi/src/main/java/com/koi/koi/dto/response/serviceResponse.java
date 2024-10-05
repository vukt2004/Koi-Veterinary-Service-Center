package com.koi.koi.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class serviceResponse {
    private String serviceID;
    private String name;
    private String type;
    private Float price;
}
