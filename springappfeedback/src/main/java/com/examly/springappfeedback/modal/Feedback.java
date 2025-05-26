
public class Feedback {
    @Id
    private Long feedbackId;
    private String feedbackText;
    private LocalDate date;
    private String category;

    private User user;

    private Trainer trainer;
}
