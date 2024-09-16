package com.koiproject.KoiVeterinaryServiceCenter.service.schedule;

import com.koiproject.KoiVeterinaryServiceCenter.entity.Schedule;

import java.util.List;

public interface IScheduleService {

    public List<Schedule> findAll();

    public Schedule findById(Long id);

    public Schedule save(Schedule schedule);

    public void delete(Long id);
}
