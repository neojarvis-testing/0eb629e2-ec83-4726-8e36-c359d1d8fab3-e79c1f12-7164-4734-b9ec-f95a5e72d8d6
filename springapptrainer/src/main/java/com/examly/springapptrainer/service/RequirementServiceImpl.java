import java.util.*;

import main.java.com.examly.springapptrainer.modal.Requirement;
import main.java.com.examly.springapptrainer.repository.RequirementRepository;
import lombok.*;
@Service
@RequiredArgsConstructor
public class RequirementServiceImpl implements RequirementService{

    private final RequirementRepository requirementRepository;

    public Requirement addRequirement(Requirement requirement) {
        return requirementRepository.save(requirement);
    }

    public Optional<Requirement>getRequirementById(Long id){
        return requirementRepository.findById(id);
    }

    public List<Requirement>getAllRequirements(){
        return requirementRepository.findAll();
    }

    
    public Requirement updateRequirement(Long id, Requirement requirement) {
        requirement.setRequirementId(id);
        return requirementRepository.save(requirement);
    }

    public void deleteRequirement(Long id) {
        requirementRepository.deleteById(id);
    }

    
    
}
