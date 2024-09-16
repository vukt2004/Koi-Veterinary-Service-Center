package com.koiproject.KoiVeterinaryServiceCenter.request;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private String name;
    private String phoneNumber;
    private String address;
}
