import java.util.List;

import main.java.com.examly.springapptrainer.modal.Trainer;


@RestController
@RequestMapping("/api/trainer")
@RequiredArgsConstructor
public class TrainerController {
    
    private final TrainerService trainerService;

    @PostMapping
    public ResponseEntity<Trainer> addtrainer(@ResponseBody Trainer trainer) {
        Trainer saveTrainer = trainerService.addTrainer(trainer);
        return ResponseEntity.status(201).body(saveTrainer);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Trainer>> getTrainerById(@PathVariable Long id ) {
        return trainerService.getTrainerById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    }

    
    @GetMapping
    public ResponseEntity<List<Trainer>> getAllTrainers(){
        return ResponseEntity.ok(trainerService.getAllTrainers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<List<Trainer>> updateTrainer(@PathVariable Long id,@RequestBody Trainer trainer ) {
        Trainer updateTrainer = trainerService.updateTrainer(id,trainer);
        return ResponseEntity.ok(updateTrainer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrainer(@PathVariable Long id) {
        trainerService.deleteTrainer(id);
        return ResponseEntity.noContent().build();
    }

}
