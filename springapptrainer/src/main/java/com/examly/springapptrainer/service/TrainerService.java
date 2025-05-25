import java.util.List;
import java.util.Optional;

import main.java.com.examly.springapptrainer.modal.trainer.Trainer;

public interface TrainerService {
    Trainer addTrainer(Trainer trainer);
    Optional<Trainer> getTrainerById(Long id);
    List<Trainer> getAllTrainers();
    Trainer updateTrainer(Long id, Trainer trainer);
    void deleteTrainer(Long id);
}

