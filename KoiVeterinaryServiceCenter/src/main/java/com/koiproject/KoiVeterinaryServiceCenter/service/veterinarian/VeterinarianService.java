package com.koiproject.KoiVeterinaryServiceCenter.service.veterinarian;

import com.koiproject.KoiVeterinaryServiceCenter.entity.Veterinarian;
import com.koiproject.KoiVeterinaryServiceCenter.repository.VeterinarianRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VeterinarianService {

    @Autowired
    private VeterinarianRepository veterinarianRepository;

    public List<Veterinarian> findAll() {
        return veterinarianRepository.findAll();
    }

    public Veterinarian findById(Long id) {
        return veterinarianRepository.findById(id).orElse(null);
    }

    public Veterinarian save(Veterinarian veterinarian) {
        return veterinarianRepository.save(veterinarian);
    }

    public void delete(Long id) {
        veterinarianRepository.deleteById(id);
    }
}
