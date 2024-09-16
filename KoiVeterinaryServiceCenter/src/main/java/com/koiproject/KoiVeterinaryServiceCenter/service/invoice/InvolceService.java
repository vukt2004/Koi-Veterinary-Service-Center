package com.koiproject.KoiVeterinaryServiceCenter.service.invoice;

import com.koiproject.KoiVeterinaryServiceCenter.entity.Invoice;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.koiproject.KoiVeterinaryServiceCenter.repository.InvolceRepository;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvolceService implements IInvolveService{

    @Autowired
    private InvolceRepository invoiceRepository;

    @Override
    public List<Invoice> findAll() {
        return invoiceRepository.findAll();
    }

    @Override
    public Invoice findById(Long id) {
        return invoiceRepository.findById(id).orElse(null);
    }

    @Override
    public Invoice save(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    @Override
    public void delete(Long id) {
        invoiceRepository.deleteById(id);
    }
}
