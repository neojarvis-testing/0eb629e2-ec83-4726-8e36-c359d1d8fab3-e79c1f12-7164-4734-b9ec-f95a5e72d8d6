import java.util.List;
import java.util.Optional;

import main.java.com.examly.springapptrainer.modal.Requirement;

public interface RequirementService {

    Requirement addRequirement(Requirement requirement);
    Optional<Requirement>getRequirementById(Long id);
    List<Requirement> getAllRequirements();
    Requirement updateRequirement(Long id , Requirement requirement );
}
