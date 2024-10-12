package com.fpt.Koi_Veterinary_Service_Center_API.controller;

import com.fpt.Koi_Veterinary_Service_Center_API.dto.request.feedbackRequest;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.request.fishRequest;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.feedbackResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.fishResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.serviceResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.service.IFishService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FishController {
    @Autowired
    private IFishService fishService;

    @GetMapping("/fish")
    public ResponseEntity<?> getAllFish() {
        List<fishResponse> fishes = fishService.getAllFish();
        return new ResponseEntity<>(fishes, HttpStatus.OK);
    }

    @PostMapping("/fish")
    public ResponseEntity<?> createFish(@Valid @RequestBody fishRequest fishRequest) {
        fishResponse response = fishService.createFish(fishRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
