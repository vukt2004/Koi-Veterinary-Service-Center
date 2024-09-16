package com.koiproject.KoiVeterinaryServiceCenter.service.service;

import com.koiproject.KoiVeterinaryServiceCenter.entity.Services;

import java.util.List;

public interface IServiceService {
    public List<Services> findAll();

    public Services findById(Long id);

    public Services save(Services service);

    public void delete(Long id);
}
