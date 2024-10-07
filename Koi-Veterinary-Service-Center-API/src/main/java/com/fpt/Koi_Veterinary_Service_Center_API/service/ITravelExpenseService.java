package com.fpt.Koi_Veterinary_Service_Center_API.service;

import com.fpt.Koi_Veterinary_Service_Center_API.dto.request.TravelExpenseRequest;
import com.fpt.Koi_Veterinary_Service_Center_API.dto.response.travelExpenseResponse;

import java.util.List;

public interface ITravelExpenseService {
    travelExpenseResponse createTravelExpense(TravelExpenseRequest travelExpenseRequest);

    travelExpenseResponse getTravelExpenseByID(String travelExpenseID);

    List<travelExpenseResponse> getAllTravelExpenses();

    travelExpenseResponse updateTravelExpense(TravelExpenseRequest travelExpenseRequest);

    void deleteTravelExpense(String travelExpenseID);
}
