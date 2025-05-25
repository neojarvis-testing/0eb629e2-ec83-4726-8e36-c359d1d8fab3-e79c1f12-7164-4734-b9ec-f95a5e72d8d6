import java.util.List;

import main.java.com.examly.springapptrainer.modal.Requirement;

@RestController
@RequestMapping("/api/requirement")
@RequiredArgsConstructor
public class RequirementController {
    
    private final RequirementService requirementService;

    @PostMapping
    public ResponseEntity<Requirement> addRequirement(@ResponseBody Requirement requirement) {
        Requirement saveRequirement = requirementService.addRequirement(requirement);
        return ResponseEntity.status(201).body(saveRequirement);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Requirement>> getRequirementById(@PathVariable Long id ) {
        return requirementService.getRequirementById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    }

    
    @GetMapping
    public ResponseEntity<List<Requirement>> getAllRequirements(){
        return ResponseEntity.ok(requirementService.getAllRequirements());
    }

    @PutMapping("/{id}")
    public ResponseEntity<List<Requirement>> updateRequirement(@PathVariable Long id,@RequestBody Requirement requirement ) {
        Requirement updateRequirement = requirementService.updateRequirement(id,requirement);
        return ResponseEntity.ok(updateRequirement);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequirement(@PathVariable Long id) {
        requirementService.deleteRequirement(id);
        return ResponseEntity.noContent().build();
    }

    
}
