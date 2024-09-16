package com.koiproject.KoiVeterinaryServiceCenter.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserDto {
    private Long userId;
    private String password;
    private String name;
    private String email;
    private String phoneNumber;
    private String roleId;
    private String address;
    private List<VeterinarianDto> veterinarians;
    private List<OrderDto> order;
    private List<FishInformationDto> fishInformation;
    private List<InvoiceDto> invoices;
}
