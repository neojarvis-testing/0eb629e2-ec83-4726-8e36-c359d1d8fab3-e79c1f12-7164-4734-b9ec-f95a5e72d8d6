package com.examly.springappfeedback.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class FeedbackDTO {
    private String feedbackText;
    private LocalDate date;
    private String category;

    private UserRef user;
    private TrainerRef trainer;

    @Data
    public static class UserRef {
        private Long userId;
    }

    @Data
    public static class TrainerRef {
        private Long trainerId;
    }
}
