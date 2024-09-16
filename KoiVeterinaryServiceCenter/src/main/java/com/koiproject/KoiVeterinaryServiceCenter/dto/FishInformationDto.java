package com.koiproject.KoiVeterinaryServiceCenter.dto;

import lombok.Data;

@Data
public class FishInformationDto {
    private Long fishId;
    private String userId;
    private float weight;
    private int age;
    private float length;
    private String healthRecord;
}
