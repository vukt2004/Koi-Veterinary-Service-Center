package com.koiproject.KoiVeterinaryServiceCenter.service.order;

import com.koiproject.KoiVeterinaryServiceCenter.entity.Order;

import java.util.List;

public interface IOrderService {

    public List<Order> findAll();

    public Order findById(Long id);

    public Order save(Order order);

    public void delete(Long id);

}
