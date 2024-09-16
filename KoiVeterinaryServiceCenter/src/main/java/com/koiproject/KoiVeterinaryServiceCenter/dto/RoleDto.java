package com.koiproject.KoiVeterinaryServiceCenter.dto;

import lombok.Data;

import java.util.List;

@Data
public class RoleDto {
    private Long roleId;
    private String title;
    private List<UserDto> users;
}
