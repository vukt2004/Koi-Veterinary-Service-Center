package com.koi.koi.service;

import com.koi.koi.dto.request.veterinarianRequest;
import com.koi.koi.dto.response.veterinarianResponse;
import jakarta.validation.Valid;

import java.util.List;

public interface IVeterinarianService {

    veterinarianResponse register(veterinarianRequest veterinarianRequest);

    veterinarianResponse getVeterinarianByVeterinarianID(String veterinarianID);

    List<veterinarianResponse> getAllVeterinarians();

    void deleteVeterinarianByVeterinarianID(String veterinarianID);

    veterinarianResponse updateVeterinarian(@Valid veterinarianRequest veterinarianRequest);
}
