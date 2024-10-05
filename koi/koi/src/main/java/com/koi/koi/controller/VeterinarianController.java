package com.koi.koi.controller;

import com.koi.koi.dto.request.veterinarianRequest;
import com.koi.koi.dto.response.veterinarianResponse;
import com.koi.koi.service.IVeterinarianService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class VeterinarianController {

    @Autowired
    private IVeterinarianService veterinarianService;

    @PostMapping("Veterinarian/add")
    public ResponseEntity<?> addVeterinarian(@Valid @RequestBody veterinarianRequest veterinarianRequest) {
        veterinarianResponse response = veterinarianService.register(veterinarianRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/Veterinarian")
    public ResponseEntity<?> getAllVeterinarian() {
        List<veterinarianResponse> veterinarians = veterinarianService.getAllVeterinarians();
        return new ResponseEntity<>(veterinarians, HttpStatus.OK);
    }

    @GetMapping("Veterinarian/{veterinarianID}")
    public ResponseEntity<?> getVeterinarianByVeterinarianID(@PathVariable("veterinarianID") String veterinarianID) {
        veterinarianResponse veterinarians = veterinarianService.getVeterinarianByVeterinarianID(veterinarianID);
        return new ResponseEntity<>(veterinarians, HttpStatus.OK);
    }

    @PutMapping("/Veterinarian/{veterinarianID}")
    public ResponseEntity<?> updateVeterinarian(@Valid @RequestBody veterinarianRequest veterinarianRequest) {
        veterinarianResponse response = veterinarianService.updateVeterinarian(veterinarianRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("Veterinarian/{veterinarianID}")
    public ResponseEntity<?> deleteVeterinarian(@PathVariable("veterinarianID") String veterinarianID) {
        veterinarianService.deleteVeterinarianByVeterinarianID(veterinarianID);
        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }



}
