import java.util.*;

import main.java.com.examly.springapptrainer.modal.Requirement;
import main.java.com.examly.springapptrainer.modal.trainer.Trainer;
import main.java.com.examly.springapptrainer.repository.TrainerRepository;
import lombok.*;

@Service
@RequiredArgsConstructor
public class TrainerServiceImpl implements TrainerService{
    
    private final  TrainerRepository trainerRepository;

    public Trainer addTrainer(Trainer trainer){
        return trainerRepository.save(trainer);
    }

    public Optional<Trainer>getTrainerById(Long id){
        return trainerRepository.findById(id);
    }
     public List<Trainer>getAllTrainers(){
        return trainerRepository.findAll();
    }

    
    public Trainer updateTrainer(Long id, Trainer trainer) {
        trainer.setTrainerId(id);
        return trainerRepository.save(trainer);
    }

    public void deleteTrainer(Long id) {
        trainerRepository.deleteById(id);
    }

}
