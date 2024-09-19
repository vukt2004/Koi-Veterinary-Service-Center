package com.fpt.Koi_Veterinary_Service_Center_API.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "Feedbacks")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@IdClass(FeedbackId.class)  // Composite primary key
public class Feedback {
    @Id
    @Column(name = "feedbackID", length = 30, nullable = false)
    private String feedbackId;

    @Id
    @ManyToOne
    @JoinColumn(name = "invoiceID", nullable = false)
    private Invoice invoice;

    @Column(name = "comment", length = 100)
    private String comment;

    @Column(name = "rating")
    private Float rating;

    @Column(name = "feedbackDateTime")
    private LocalDateTime feedbackDateTime;
}
