package com.koi.koi.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.koi.koi.entity.User;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class veterinarianResponse {
    private String veterinarianID;
    private Float rating;
    private String status;
    private User user;
}
