package com.fpt.Koi_Veterinary_Service_Center_API.service.impl;

import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.fishResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.serviceResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.Fish;
import com.fpt.Koi_Veterinary_Service_Center_API.repository.FishRepository;
import com.fpt.Koi_Veterinary_Service_Center_API.service.IFishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FishServiceImpl implements IFishService {
    @Autowired
    private FishRepository fishRepository;

    @Override
    public List<fishResponse> getAllFish() {
        List<Fish> fishes = fishRepository.findAll();
        List<fishResponse> fishResponses = new ArrayList<>();
        for (Fish fish : fishes) {
            fishResponse response = new fishResponse();
            response.setDescribe(fish.getDescribe());
            response.setWeight(fish.getWeight());
            response.setLength(fish.getWeight());
            response.setFishID(fish.getFishID());
            response.setMonth(fish.getMonth());
            response.setUserID(fish.getUser().getUserID());
            fishResponses.add(response);
        }
        return fishResponses;
    }
}
