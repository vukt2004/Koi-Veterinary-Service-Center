package com.koiproject.KoiVeterinaryServiceCenter.service.invoicedetail;

import com.koiproject.KoiVeterinaryServiceCenter.entity.InvoiceDetail;
import com.koiproject.KoiVeterinaryServiceCenter.repository.InvoiceDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InvolceDetailService implements IInvolveDetailService{

    @Autowired
    private InvoiceDetailRepository invoiceDetailRepository;

    @Override
    public List<InvoiceDetail> findAll() {
        return invoiceDetailRepository.findAll();
    }

    @Override
    public InvoiceDetail findById(Long id) {
        return invoiceDetailRepository.findById(id).orElse(null);
    }

    @Override
    public InvoiceDetail save(InvoiceDetail invoiceDetail) {
        return invoiceDetailRepository.save(invoiceDetail);
    }

    @Override
    public void delete(Long id) {
        invoiceDetailRepository.deleteById(id);
    }
}
