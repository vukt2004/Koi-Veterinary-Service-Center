package com.koi.koi.service.impl;

import com.koi.koi.dto.request.fishRequest;
import com.koi.koi.dto.response.fishResponse;
import com.koi.koi.entity.Fish;
import com.koi.koi.entity.User;
import com.koi.koi.exception.AppException;
import com.koi.koi.repository.FishRepository;
import com.koi.koi.repository.UserRepository;
import com.koi.koi.service.IFishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class FishServiceImpl implements IFishService {

    @Autowired
    private FishRepository fishRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<fishResponse> getAllFishes() {
        List<Fish> fishes = fishRepository.findAll();
        List<fishResponse> fishResponses = new ArrayList<>();
        for (Fish fish : fishes) {
            fishResponse response = new fishResponse();
            response.setFishID(fish.getFishID());
            response.setWeight(fish.getWeight());
            response.setLength(fish.getLength());
            response.setMonth(fish.getMonth());
            response.setDescription(fish.getDescription());
            response.setUserID(fish.getUser().getUserID());
            fishResponses.add(response);
        }
        return fishResponses;
    }

    @Override
    public List<fishResponse> getAllFishesByUserID(String userID) {
        List<Fish> fishes = fishRepository.findAllByUser_UserID(userID);
        List<fishResponse> fishResponses = new ArrayList<>();
        for (Fish fish : fishes) {
            fishResponse response = new fishResponse();
            response.setFishID(fish.getFishID());
            response.setWeight(fish.getWeight());
            response.setLength(fish.getLength());
            response.setMonth(fish.getMonth());
            response.setDescription(fish.getDescription());
            response.setUserID(fish.getUser().getUserID());
            fishResponses.add(response);
        }
        return fishResponses;
    }

    @Override
    public fishResponse getFishByFishID(String userID, String fishID) {
        Fish fish = fishRepository.findByFishID(fishID).orElseThrow(() -> new AppException("Fish not found"));
        if (!fish.getUser().getUserID().equals(userID)) {
            throw new AppException("You do not have permission to access this fish");
        }
        fishResponse response = new fishResponse();
        response.setFishID(fish.getFishID());
        response.setWeight(fish.getWeight());
        response.setLength(fish.getLength());
        response.setMonth(fish.getMonth());
        response.setDescription(fish.getDescription());
        response.setUserID(fish.getUser().getUserID());
        return response;
    }

    @Override
    public fishResponse addFish(fishRequest fishRequest) {
        fishResponse response = new fishResponse();
        User user = userRepository.findByUserID(fishRequest.getUserID())
                .orElseThrow(() -> new AppException("User not found"));

        Fish fish = new Fish();
        fish.setWeight(fishRequest.getWeight());
        fish.setLength(fishRequest.getLength());
        fish.setMonth(fishRequest.getMonth());
        fish.setDescription(fishRequest.getDescription());
        fish.setUser(user);
        Fish savedFish = fishRepository.save(fish);
        response.setFishID(savedFish.getFishID());
        response.setWeight(savedFish.getWeight());
        response.setLength(savedFish.getLength());
        response.setMonth(savedFish.getMonth());
        response.setDescription(savedFish.getDescription());
        response.setUserID(savedFish.getUser().getUserID());
        return response;
    }

    @Override
    public fishResponse updateFish(String userID, fishRequest fishRequest) {
        Fish fish = fishRepository.findByFishID(fishRequest.getFishID())
                .orElseThrow(() -> new AppException("Fish not found"));

        if (!fish.getUser().getUserID().equals(userID)) {
            throw new AppException("You do not have permission to update this fish");
        }

        fish.setWeight(fishRequest.getWeight());
        fish.setLength(fishRequest.getLength());
        fish.setMonth(fishRequest.getMonth());
        fish.setDescription(fishRequest.getDescription());

        Fish updatedFish = fishRepository.save(fish);
        fishResponse response = new fishResponse();

        response.setFishID(updatedFish.getFishID());
        response.setWeight(updatedFish.getWeight());
        response.setLength(updatedFish.getLength());
        response.setMonth(updatedFish.getMonth());
        response.setDescription(updatedFish.getDescription());
        response.setUserID(updatedFish.getUser().getUserID());

        return response;
    }

    @Override
    @Transactional
    public void deleteFish(String userID, String fishID) {
        Fish fish = fishRepository.findByFishID(fishID)
                .orElseThrow(() -> new AppException("Fish not found"));

        if (!fish.getUser().getUserID().equals(userID)) {
            throw new AppException("You do not have permission to delete this fish");
        }

        fishRepository.delete(fish);
    }

}
