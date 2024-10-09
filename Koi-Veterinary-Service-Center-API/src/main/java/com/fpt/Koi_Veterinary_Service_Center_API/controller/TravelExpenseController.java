package com.fpt.Koi_Veterinary_Service_Center_API.controller;

import com.fpt.Koi_Veterinary_Service_Center_API.dto.request.TravelExpenseRequest;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.travelExpenseResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.service.ITravelExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TravelExpenseController {
    @Autowired
    private ITravelExpenseService travelService;
    @PostMapping("/travelExpense/add")
    public ResponseEntity<?> addTravelExpense(@Valid @RequestBody TravelExpenseRequest travelExpenseRequest) {
        travelExpenseResponse response = travelService.createTravelExpense(travelExpenseRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/travelExpense")
    public ResponseEntity<?> getAllTravelExpenses() {
        List<travelExpenseResponse> travelExpenses = travelService.getAllTravelExpenses();
        return new ResponseEntity<>(travelExpenses, HttpStatus.OK);
    }

    @GetMapping("/travelExpense/{travelExpenseID}")
    public ResponseEntity<?> getTravelExpenseByID(@PathVariable("travelExpenseID") String travelExpenseID) {
        travelExpenseResponse response = travelService.getTravelExpenseByID(travelExpenseID);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/travelExpense/update")
    public ResponseEntity<?> updateTravelExpense(@Valid @RequestBody TravelExpenseRequest travelExpenseRequest) {
        travelExpenseResponse response = travelService.updateTravelExpense(travelExpenseRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/travelExpense/delete/{travelExpenseID}")
    public ResponseEntity<?> deleteTravelExpense(@PathVariable("travelExpenseID") String travelExpenseID) {
        travelService.deleteTravelExpense(travelExpenseID);
        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }
}
