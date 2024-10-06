package com.koi.koi.service.impl;

import com.koi.koi.dto.request.veterinarianRequest;
import com.koi.koi.dto.response.veterinarianResponse;
import com.koi.koi.entity.User;
import com.koi.koi.entity.Veterinarian;
import com.koi.koi.exception.AppException;
import com.koi.koi.repository.UserRepository;
import com.koi.koi.repository.VeterinarianRepository;
import com.koi.koi.service.IVeterinarianService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VeterinarianServiceImpl implements IVeterinarianService {

    @Autowired
    private VeterinarianRepository veterinarianRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public veterinarianResponse register(veterinarianRequest veterinarianRequest) {
        veterinarianResponse response = new veterinarianResponse();
        Veterinarian veterinarian = new Veterinarian();
        User user = userRepository.findByUserID(veterinarianRequest.getUser().getUserID())
                .orElseThrow(() -> new AppException("User not found"));
        veterinarian.setVeterinarianID(veterinarian.getVeterinarianID());
        veterinarian.setRating(veterinarianRequest.getRating());
        veterinarian.setStatus(veterinarianRequest.getStatus());
        veterinarian.setUser(user);
        Veterinarian savedVeterinarian = veterinarianRepository.save(veterinarian);
        response.setVeterinarianID(savedVeterinarian.getVeterinarianID());
        response.setRating(savedVeterinarian.getRating());
        response.setStatus(savedVeterinarian.getStatus());
        response.setUser(savedVeterinarian.getUser());
        return response;
    }

    @Override
    public veterinarianResponse getVeterinarianByVeterinarianID(String veterinarianID) {
        Veterinarian veterinarian = veterinarianRepository.findByVeterinarianID(veterinarianID)
                .orElseThrow(() -> new AppException("Veterinarian not found"));
        veterinarianResponse response = new veterinarianResponse();
        response.setVeterinarianID(veterinarianID);
        response.setRating(veterinarian.getRating());
        response.setStatus(veterinarian.getStatus());
        response.setUser(veterinarian.getUser());
        return response;
    }

    @Override
    public List<veterinarianResponse> getAllVeterinarians() {
        List<Veterinarian> veterinarians = veterinarianRepository.findAll();
        List<veterinarianResponse> veterinarianResponses = new ArrayList<>();
        for (Veterinarian veterinarian : veterinarians) {
            veterinarianResponse response = new veterinarianResponse();
            response.setVeterinarianID(veterinarian.getVeterinarianID());
            response.setRating(veterinarian.getRating());
            response.setStatus(veterinarian.getStatus());
            response.setUser(veterinarian.getUser());
            veterinarianResponses.add(response);
        }
        return veterinarianResponses;
    }


    @Override
    @Transactional
    public void deleteVeterinarianByVeterinarianID(String veterinarianID) {
        Veterinarian service = veterinarianRepository.findByVeterinarianID(veterinarianID)
                .orElseThrow(() -> new AppException("Veterinarian not found"));
        veterinarianRepository.delete(service);
    }

    @Override
    public veterinarianResponse updateVeterinarian(veterinarianRequest veterinarianRequest) {
        veterinarianResponse response = new veterinarianResponse();
        Veterinarian veterinarian = veterinarianRepository.findByVeterinarianID(veterinarianRequest.getVeterinarianID())
                .orElseThrow(() -> new AppException("Veterinarian not found"));
        Veterinarian savedVeterinarian = veterinarianRepository.save(veterinarian);
        response.setVeterinarianID(veterinarian.getVeterinarianID());
        response.setRating(veterinarian.getRating());
        response.setStatus(veterinarian.getStatus());
        response.setUser(veterinarian.getUser());
        return response;
    }

}
