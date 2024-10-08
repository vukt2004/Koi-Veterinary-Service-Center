package com.fpt.Koi_Veterinary_Service_Center_API.controller;

import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.fishResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.serviceResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.service.IFishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
