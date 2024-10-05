package com.koi.koi.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.koi.koi.entity.Role;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class userResponse {
    private String userID;
    private String password;
    private String name;
    private String email;
    private String phoneNumber;
    private Role role;
    private String address;
}
