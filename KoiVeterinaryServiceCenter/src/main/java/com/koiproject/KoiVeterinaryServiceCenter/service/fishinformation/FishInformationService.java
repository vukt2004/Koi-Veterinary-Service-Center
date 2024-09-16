package com.koiproject.KoiVeterinaryServiceCenter.service.fishinformation;

import com.koiproject.KoiVeterinaryServiceCenter.entity.FishInformation;
import com.koiproject.KoiVeterinaryServiceCenter.repository.FishInformationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FishInformationService implements IFishinformationService {

    @Autowired
    private FishInformationRepository fishInformationRepository;

    @Override
    public List<FishInformation> findAll() {
        return fishInformationRepository.findAll();
    }

    @Override
    public FishInformation findById(Long id) {
        return fishInformationRepository.findById(id).orElse(null);
    }

    @Override
    public FishInformation save(FishInformation fishInformation) {
        return fishInformationRepository.save(fishInformation);
    }

    @Override
    public void delete(Long id) {
        fishInformationRepository.deleteById(id);
    }
}
