package com.koi.koi.service.impl;

import com.koi.koi.dto.request.serviceRequest;
import com.koi.koi.dto.response.serviceResponse;
import com.koi.koi.entity.Service;
import com.koi.koi.exception.AppException;
import com.koi.koi.repository.ServiceRepository;
import com.koi.koi.service.IServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

public class ServiceServiceImpl implements IServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    public serviceResponse createService(serviceRequest serviceRequest) {
        serviceResponse response = new serviceResponse();
        Service service = new Service();
        service.setServiceID(serviceRequest.getServiceID());
        service.setName(serviceRequest.getName());
        service.setType(serviceRequest.getType());
        service.setPrice(serviceRequest.getPrice());
        Service savedService = serviceRepository.save(service);
        response.setServiceID(savedService.getServiceID());
        response.setName(serviceRequest.getName());
        response.setType(serviceRequest.getType());
        response.setPrice(serviceRequest.getPrice());

        return response;
    }

    @Override
    public serviceResponse getServiceByServiceID(String serviceID) {
        Service service = serviceRepository.findByServiceID(serviceID).orElseThrow(() -> new AppException("Service not found"));
        serviceResponse response = new serviceResponse();
        response.setServiceID(service.getServiceID());
        response.setName(service.getName());
        response.setType(service.getType());
        response.setPrice(service.getPrice());
        return response;
    }

    @Override
    public List<serviceResponse> getAllServices() {
        List<Service> services = serviceRepository.findAll();
        List<serviceResponse> serviceResponses = new ArrayList<>();
        for (Service service : services) {
            serviceResponse response = new serviceResponse();
            response.setServiceID(service.getServiceID());
            response.setName(service.getName());
            response.setType(service.getType());
            response.setPrice(service.getPrice());
            serviceResponses.add(response);
        }
        return serviceResponses;
    }

    @Override
    public serviceResponse updateService(serviceRequest serviceRequest) {
        serviceResponse response = new serviceResponse();
        Service service = serviceRepository.findByServiceID(serviceRequest.getServiceID())
                .orElseThrow(() -> new AppException("Service not found"));

        service.setServiceID(serviceRequest.getServiceID());
        service.setName(serviceRequest.getName());
        service.setType(serviceRequest.getType());
        service.setPrice(serviceRequest.getPrice());

        Service savedService = serviceRepository.save(service);
        response.setServiceID(savedService.getServiceID());
        response.setName(savedService.getName());
        response.setType(savedService.getType());
        response.setPrice(savedService.getPrice());
        return response;
    }

    @Override
    @Transactional
    public void deleteService(String serviceID) {
        Service service = serviceRepository.findByServiceID(serviceID)
                .orElseThrow(() -> new AppException("Service not found"));
        serviceRepository.delete(service);
    }
}
