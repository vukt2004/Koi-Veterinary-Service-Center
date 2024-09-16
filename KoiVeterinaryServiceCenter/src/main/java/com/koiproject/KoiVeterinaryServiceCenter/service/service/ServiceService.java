package com.koiproject.KoiVeterinaryServiceCenter.service.service;


import com.koiproject.KoiVeterinaryServiceCenter.entity.Services;
import com.koiproject.KoiVeterinaryServiceCenter.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceService implements IServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    public List<Services> findAll() {
        return serviceRepository.findAll();
    }

    @Override
    public Services findById(Long id) {
        return serviceRepository.findById(id).orElse(null);
    }

    @Override
    public Services save(Services service) {
        return serviceRepository.save(service);
    }

    @Override
    public void delete(Long id) {
        serviceRepository.deleteById(id);
    }

}
