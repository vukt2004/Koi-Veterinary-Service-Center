package com.fpt.Koi_Veterinary_Service_Center_API.service.impl;

import com.fpt.Koi_Veterinary_Service_Center_API.dto.request.TravelExpenseRequest;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.travelExpenseResponse;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.TravelExpense;
import com.fpt.Koi_Veterinary_Service_Center_API.exception.AppException;
import com.fpt.Koi_Veterinary_Service_Center_API.repository.TravelExpenseRepository;
import com.fpt.Koi_Veterinary_Service_Center_API.service.ITravelExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TravelExpenseServiceImpl implements ITravelExpenseService {

    @Autowired
    private TravelExpenseRepository travelExpenseRepository;
    @Override
    public travelExpenseResponse createTravelExpense(TravelExpenseRequest travelExpenseRequest) {
        travelExpenseResponse response = new travelExpenseResponse();
        TravelExpense travelExpense = new TravelExpense();
        if (travelExpenseRepository.existsByExpenseID(travelExpenseRequest.getExpenseID())) {
            throw new AppException(travelExpenseRequest.getExpenseID() + " already exists");
        } else {
            travelExpense.setExpenseID(travelExpenseRequest.getExpenseID());
        }
        travelExpense.setFee(travelExpenseRequest.getFee());
        travelExpense.setEndLocation(travelExpenseRequest.getEndLocation());
        TravelExpense savedTravelExpense = travelExpenseRepository.save(travelExpense);
        response.setEndLocation(savedTravelExpense.getEndLocation());
        response.setFee(savedTravelExpense.getFee());
        response.setExpenseID(savedTravelExpense.getExpenseID());
        return response;
    }

    @Override
    public travelExpenseResponse getTravelExpenseByID(String travelExpenseID) {
        TravelExpense travelExpense = travelExpenseRepository.findByExpenseID(travelExpenseID).orElseThrow(() -> new AppException("Expense not found"));
        travelExpenseResponse response = new travelExpenseResponse();
        response.setExpenseID(travelExpense.getExpenseID());
        response.setFee(travelExpense.getFee());
        response.setEndLocation(travelExpense.getEndLocation());
        return response;
    }

    @Override
    public List<travelExpenseResponse> getAllTravelExpenses() {
        List<TravelExpense> travelExpenses = travelExpenseRepository.findAll();
        List<travelExpenseResponse> travelExpenseResponses = new ArrayList<>();
        for (TravelExpense travelExpense : travelExpenses) {
            travelExpenseResponse response = new travelExpenseResponse();
            response.setEndLocation(travelExpense.getEndLocation());
            response.setFee(travelExpense.getFee());
            response.setExpenseID(travelExpense.getExpenseID());
            travelExpenseResponses.add(response);
        }
        return travelExpenseResponses;
    }

    @Override
    public travelExpenseResponse updateTravelExpense(TravelExpenseRequest travelExpenseRequest) {
        travelExpenseResponse response = new travelExpenseResponse();
        TravelExpense travelExpense = travelExpenseRepository.findByExpenseID(travelExpenseRequest.getExpenseID())
                .orElseThrow(() -> new AppException("Expense not found"));
        travelExpense.setEndLocation(travelExpenseRequest.getEndLocation());
        travelExpense.setFee(travelExpenseRequest.getFee());
        travelExpense.setExpenseID(travelExpenseRequest.getExpenseID());
        TravelExpense savedTravelExpense = travelExpenseRepository.save(travelExpense);
        response.setExpenseID(savedTravelExpense.getExpenseID());
        response.setFee(savedTravelExpense.getFee());
        response.setEndLocation(savedTravelExpense.getEndLocation());
        return response;
    }

    @Override
    public void deleteTravelExpense(String travelExpenseID) {
        TravelExpense travelExpense = travelExpenseRepository.findByExpenseID(travelExpenseID)
                .orElseThrow(() -> new AppException("Expense not found"));
        travelExpenseRepository.delete(travelExpense);
    }
}
