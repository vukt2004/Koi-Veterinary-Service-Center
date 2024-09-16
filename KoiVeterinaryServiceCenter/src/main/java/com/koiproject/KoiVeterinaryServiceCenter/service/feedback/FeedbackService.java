package com.koiproject.KoiVeterinaryServiceCenter.service.feedback;

import com.koiproject.KoiVeterinaryServiceCenter.entity.Feedback;
import com.koiproject.KoiVeterinaryServiceCenter.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedbackService implements IFeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;


    @Override
    public List<Feedback> findAll() {
        return feedbackRepository.findAll();
    }

    @Override
    public Feedback findById(Long id) {
        return feedbackRepository.findById(id).orElse(null);
    }

    @Override
    public Feedback save(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    @Override
    public void delete(Long id) {
        feedbackRepository.deleteById(id);
    }


}
