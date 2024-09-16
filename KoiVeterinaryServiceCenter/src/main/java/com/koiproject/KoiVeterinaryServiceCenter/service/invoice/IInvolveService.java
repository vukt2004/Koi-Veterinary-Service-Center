package com.koiproject.KoiVeterinaryServiceCenter.service.invoice;

import com.koiproject.KoiVeterinaryServiceCenter.entity.Invoice;

import java.util.List;

public interface IInvolveService {
    public List<Invoice> findAll();

    public Invoice findById(Long id);

    public Invoice save(Invoice invoice);

    public void delete(Long id);
}
