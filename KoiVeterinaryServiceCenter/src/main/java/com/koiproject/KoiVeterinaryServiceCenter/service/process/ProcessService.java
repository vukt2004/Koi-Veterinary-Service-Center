package com.koiproject.KoiVeterinaryServiceCenter.service.process;

import com.koiproject.KoiVeterinaryServiceCenter.repository.ProcessRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.koiproject.KoiVeterinaryServiceCenter.entity.Process;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProcessService implements IProcessService{

    @Autowired
    private ProcessRepository processRepository;

    @Override
    public List<Process> findAll() {
        return processRepository.findAll();
    }

    @Override
    public Process findById(Long id) {
        return processRepository.findById(id).orElse(null);
    }

    @Override
    public Process save(Process process) {
        return processRepository.save(process);
    }

    @Override
    public void delete(Long id) {
        processRepository.deleteById(id);
    }
}
