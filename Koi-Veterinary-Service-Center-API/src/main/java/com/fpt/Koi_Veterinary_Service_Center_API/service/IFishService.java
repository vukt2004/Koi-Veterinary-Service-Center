package com.fpt.Koi_Veterinary_Service_Center_API.service;

import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.fishResponse;

import java.util.List;

public interface IFishService {
    List<fishResponse> getAllFish();

}
