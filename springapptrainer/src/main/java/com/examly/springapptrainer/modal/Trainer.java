package main.java.com.examly.springapptrainer.modal.trainer;


@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Trainer {
    
    private Long trainerId;

    private String name;
    private String expertise;
    private String email;
    private String phone;
}
