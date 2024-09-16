package com.koiproject.KoiVeterinaryServiceCenter.repository;

import com.koiproject.KoiVeterinaryServiceCenter.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}
