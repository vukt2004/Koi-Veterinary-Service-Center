package com.koiproject.KoiVeterinaryServiceCenter.service.schedule;

import com.koiproject.KoiVeterinaryServiceCenter.entity.Schedule;
import com.koiproject.KoiVeterinaryServiceCenter.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService implements IScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;


    @Override
    public List<Schedule> findAll() {
        return scheduleRepository.findAll();
    }

    @Override
    public Schedule findById(Long id) {
        return scheduleRepository.findById(id).orElse(null);
    }

    @Override
    public Schedule save(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    @Override
    public void delete(Long id) {
        scheduleRepository.deleteById(id);
    }


}
