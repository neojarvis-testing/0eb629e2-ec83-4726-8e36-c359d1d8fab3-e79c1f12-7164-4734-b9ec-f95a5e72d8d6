import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequirementService } from 'src/app/services/requirement.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { Requirement } from 'src/app/services/requirement.service';
import { Trainer } from 'src/app/services/trainer.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coordinator-view-requirements',
  templateUrl: './coordinator-view-requirements.component.html',
  styleUrls: ['./coordinator-view-requirements.component.css']
})
export class CoordinatorViewRequirementComponent implements OnInit, OnDestroy {
  requirements: Requirement[] = [];
  filteredRequirements: Requirement[] = [];
  availableTrainers: Trainer[] = [];
  filteredAvailableTrainers: Trainer[] = [];

  searchTerm: string = '';
  trainerSearchTerm: string = '';

  showAssignTrainerModal: boolean = false;
  currentRequirementToAssign: Requirement | null = null;
  assignModalTitle: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  private requirementsSubscription: Subscription | undefined;
  private trainersSubscription: Subscription | undefined;

  constructor(
    private requirementService: RequirementService,
    private trainerService: TrainerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadRequirements();
  }

  ngOnDestroy(): void {
    if (this.requirementsSubscription) {
      this.requirementsSubscription.unsubscribe();
    }
    if (this.trainersSubscription) {
      this.trainersSubscription.unsubscribe();
    }
  }

  loadRequirements(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.requirementsSubscription = this.requirementService.getAllRequirements().subscribe({
      next: (data: Requirement[]) => {
        this.requirements = data;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error fetching requirements:', error);
        this.errorMessage = 'Failed to load requirements. Please try again.';
        this.requirements = [];
        this.applyFilters();
      }
    });
  }

  applyFilters(): void {
    let tempRequirements = [...this.requirements];

    if (this.searchTerm) {
      tempRequirements = tempRequirements.filter(req =>
        req.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        req.department.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.filteredRequirements = tempRequirements;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  // Methods for Assign Trainer Modal
  openAssignTrainerModal(requirement: Requirement): void {
    this.currentRequirementToAssign = requirement;
    this.assignModalTitle = `Select a trainer to assign to ${requirement.title}`;
    this.showAssignTrainerModal = true;
    this.loadAvailableTrainers();
  }

  closeAssignTrainerModal(): void {
    this.showAssignTrainerModal = false;
    this.currentRequirementToAssign = null;
    this.trainerSearchTerm = '';
    this.availableTrainers = [];
    this.filteredAvailableTrainers = [];
  }

  loadAvailableTrainers(): void {
    this.trainersSubscription = this.trainerService.getAllTrainer().subscribe({ // Using getAllTrainer, you might need a dedicated 'getAvailableTrainers' endpoint
      next: (data: Trainer[]) => {
        // Filter out trainers that are 'Inactive' or already assigned if your logic dictates
        this.availableTrainers = data.filter(trainer => trainer.status === 'Active');
        this.applyTrainerFilters();
      },
      error: (error) => {
        console.error('Error fetching available trainers:', error);
        this.errorMessage = 'Failed to load available trainers.';
      }
    });
  }

  applyTrainerFilters(): void {
    let tempTrainers = [...this.availableTrainers];

    if (this.trainerSearchTerm) {
      tempTrainers = tempTrainers.filter(trainer =>
        trainer.name.toLowerCase().includes(this.trainerSearchTerm.toLowerCase()) ||
        trainer.expertise.toLowerCase().includes(this.trainerSearchTerm.toLowerCase())
      );
    }
    this.filteredAvailableTrainers = tempTrainers;
  }

  onTrainerSearchChange(): void {
    this.applyTrainerFilters();
  }

  assignTrainer(trainer: Trainer): void {
    if (this.currentRequirementToAssign && trainer.trainerId) {
      this.requirementService.assignTrainerToRequirement(this.currentRequirementToAssign.requirementId!, trainer.trainerId).subscribe({
        next: (updatedRequirement) => {
          this.successMessage = `Trainer ${trainer.name} assigned to ${this.currentRequirementToAssign!.title} successfully!`;
          this.closeAssignTrainerModal();
          this.loadRequirements(); // Reload requirements to update status
        },
        error: (error) => {
          console.error('Error assigning trainer:', error);
          this.errorMessage = 'Failed to assign trainer. Please try again.';
          this.closeAssignTrainerModal();
        }
      });
    } else {
      this.errorMessage = 'Cannot assign trainer: Requirement or Trainer ID is missing.';
      this.closeAssignTrainerModal();
    }
  }

  // Placeholder for navigating to other components if needed
  viewFeedback(): void {
    this.router.navigate(['/manager-view-feedback']); // Adjust as per your routing
  }

  viewTrainers(): void {
    this.router.navigate(['/coordinator-view-trainers']);
  }
}
