package com.koiproject.KoiVeterinaryServiceCenter.request;

import com.koiproject.KoiVeterinaryServiceCenter.entity.Role;
import lombok.Data;

@Data
public class CreateUserRequest {
    private String password;
    private String name;
    private String email;
    private String phoneNumber;
    private Long roleId;
    private String address;
}
