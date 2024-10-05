package com.koi.koi.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class fishResponse {
    private String fishID;
    private Float weight;
    private Float length;
    private Integer month;
    private String description;
    private String userID;
}
