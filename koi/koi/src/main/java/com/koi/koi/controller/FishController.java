package com.koi.koi.controller;

import com.koi.koi.dto.request.fishRequest;
import com.koi.koi.dto.response.fishResponse;
import com.koi.koi.service.IFishService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FishController {
    @Autowired
    private IFishService fishService;

    @PostMapping("/Fish/add")
    public ResponseEntity<?> addFish(@Valid @RequestBody fishRequest fishRequest) {
        fishResponse response =  fishService.addFish(fishRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/Fish")
    public ResponseEntity<?> getAllFishes() {
        List<fishResponse> fishes = fishService.getAllFishes();
        return new ResponseEntity<>(fishes, HttpStatus.OK);
    }

    @GetMapping("/Fish/user/{userID}")
    public ResponseEntity<?> getAllFishesByUserID(@PathVariable("userID") String userID) {
        List<fishResponse> fishes = fishService.getAllFishesByUserID(userID);
        return new ResponseEntity<>(fishes, HttpStatus.OK);
    }

    @GetMapping("/Fish/{userID}/{fishID}")
    public ResponseEntity<?> getFishByFishID(@PathVariable("fishID") String fishID, @RequestParam("userID") String userID) {
        fishResponse response = fishService.getFishByFishID(userID, fishID);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/Fish/{fishID}")
    public ResponseEntity<?> updateFish(@PathVariable("userID") String userID, @Valid @RequestBody fishRequest fishRequest) {
        fishResponse response = fishService.updateFish(userID, fishRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/Fish/{fishID}")
    public ResponseEntity<?> deleteFish(@PathVariable("userID") String userID, @PathVariable("fishID") String fishID) {
        fishService.deleteFish(userID, fishID);
        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }


}
