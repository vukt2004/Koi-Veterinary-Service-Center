package com.koi.koi.service;

import com.koi.koi.dto.request.fishRequest;
import com.koi.koi.dto.response.fishResponse;
import com.koi.koi.entity.Fish;
import jakarta.validation.Valid;

import java.util.List;

public interface IFishService {
    List<fishResponse> getAllFishes();
    List<fishResponse> getAllFishesByUserID(String userID);
    fishResponse getFishByFishID(String userId, String fishID);
    fishResponse addFish(fishRequest fishRequest);
    fishResponse updateFish(@Valid String userID, @Valid fishRequest fishRequest);
    void deleteFish(String userID, String fishID);
}
