package com.examly.springapptrainer.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapptrainer.modal.Requirement;
import com.examly.springapptrainer.service.RequirementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/requirement")
@RequiredArgsConstructor
public class RequirementController {

    private final RequirementService requirementService;

    @PostMapping
    @PreAuthorize("hasRole('Manager')")
    public ResponseEntity<Requirement> addRequirement(@RequestBody Requirement requirement) {
        Requirement saveRequirement = requirementService.addRequirement(requirement);
        return ResponseEntity.status(201).body(saveRequirement);
    }

    @GetMapping("/{requirementId}")
    @PreAuthorize("hasRole('Manager')")
    public ResponseEntity<Requirement> getRequirementById(@PathVariable Long requirementId) {
        return requirementService.getRequirementById(requirementId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('Manager', 'Coordinator')")
    public ResponseEntity<List<Requirement>> getAllRequirements() {
        return ResponseEntity.ok(requirementService.getAllRequirements());
    }

    @PutMapping("/{requirementId}")
    @PreAuthorize("hasRole('Manager')")
    public ResponseEntity<Requirement> updateRequirement(@PathVariable Long requirementId, @RequestBody Requirement requirement) {
        Requirement updateRequirement = requirementService.updateRequirement(requirementId, requirement);
        return ResponseEntity.ok(updateRequirement);
    }

    @DeleteMapping("/{requirementId}")
    @PreAuthorize("hasRole('Manager')")
    public ResponseEntity<Void> deleteRequirement(@PathVariable Long requirementId) {
        requirementService.deleteRequirement(requirementId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/trainer/{trainerId}")
    @PreAuthorize("hasAnyRole('Manager', 'Coordinator')")
    public ResponseEntity<List<Requirement>> getRequirementsByTrainerId(@PathVariable Long trainerId) {
        return ResponseEntity.ok(requirementService.getRequirementsByTrainerId(trainerId));
    }
}
