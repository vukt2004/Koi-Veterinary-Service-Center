package com.koiproject.KoiVeterinaryServiceCenter.service.feedback;

import com.koiproject.KoiVeterinaryServiceCenter.entity.Feedback;

import java.util.List;

public interface IFeedbackService {

    public List<Feedback> findAll();

    public Feedback findById(Long id);

    public Feedback save(Feedback feedback);

    public void delete(Long id);


}
