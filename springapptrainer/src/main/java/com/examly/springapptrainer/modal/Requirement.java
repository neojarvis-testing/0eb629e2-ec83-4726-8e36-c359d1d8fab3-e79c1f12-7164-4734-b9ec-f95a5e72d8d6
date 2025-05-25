package main.java.com.examly.springapptrainer.modal;

import java.sql.Date;

import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Requirement {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requirementId;
    
    private String title;
    private String description;
    private String department;
    private LocalDate postedDate;
    private String status;
    private String duration;
    private String mode;
    private String location;
    private String skillLevel;
    private String budget;
    private String priority;

    @ManytoOne
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;
}
