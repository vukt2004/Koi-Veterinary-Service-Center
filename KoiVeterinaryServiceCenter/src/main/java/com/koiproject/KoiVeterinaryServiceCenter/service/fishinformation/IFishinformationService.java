package com.koiproject.KoiVeterinaryServiceCenter.service.fishinformation;

import com.koiproject.KoiVeterinaryServiceCenter.entity.FishInformation;

import java.util.List;

public interface IFishinformationService {

    public List<FishInformation> findAll();

    public FishInformation findById(Long id);

    public FishInformation save(FishInformation fishInformation);

    public void delete(Long id);

}
