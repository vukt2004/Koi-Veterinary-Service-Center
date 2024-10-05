package com.koi.koi.service;

import com.koi.koi.dto.request.serviceRequest;
import com.koi.koi.dto.response.serviceResponse;

import java.util.List;

public interface IServiceService {
    serviceResponse createService(serviceRequest serviceRequest);

    serviceResponse getServiceByServiceID(String serviceID);

    List<serviceResponse> getAllServices();

    serviceResponse updateService(serviceRequest serviceRequest);

    void deleteService(String serviceID);
}
