package main.java.com.examly.springapptrainer.modal;

import lombok.*;

import 

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Requirement {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requirementId;
}
