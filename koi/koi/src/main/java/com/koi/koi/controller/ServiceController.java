package com.koi.koi.controller;

import com.koi.koi.dto.request.fishRequest;
import com.koi.koi.dto.request.serviceRequest;
import com.koi.koi.dto.response.serviceResponse;
import com.koi.koi.service.IServiceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ServiceController {
    @Autowired
    private IServiceService serviceService;

    @PostMapping("/Service/add")
    public ResponseEntity<?> addService(@Valid @RequestBody serviceRequest serviceRequest) {
        serviceResponse response = serviceService.createService(serviceRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/Service")
    public ResponseEntity<?> getAllServices() {
        List<serviceResponse> fishes = serviceService.getAllServices();
        return new ResponseEntity<>(fishes, HttpStatus.OK);
    }

    @GetMapping("/Service/{serviceID}")
    public ResponseEntity<?> getServiceByServiceID(@PathVariable("serviceID") String serviceID) {
        serviceResponse response = serviceService.getServiceByServiceID(serviceID);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/Service/{serviceID}")
    public ResponseEntity<?> updateService(@Valid @RequestBody serviceRequest serviceRequest) {
        serviceResponse response = serviceService.updateService(serviceRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/Service/{serviceID}")
    public ResponseEntity<?> deleteService(@PathVariable("serviceID") String serviceID) {
        serviceService.deleteService(serviceID);
        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }

}
