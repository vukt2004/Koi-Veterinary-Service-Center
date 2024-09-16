package com.koiproject.KoiVeterinaryServiceCenter.repository;

import com.koiproject.KoiVeterinaryServiceCenter.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
