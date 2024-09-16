package com.koiproject.KoiVeterinaryServiceCenter.service.process;

import com.koiproject.KoiVeterinaryServiceCenter.entity.Process;

import java.util.List;

public interface IProcessService {

    public List<Process> findAll();

    public Process findById(Long id);

    public Process save(Process process);

    public void delete(Long id);

}
