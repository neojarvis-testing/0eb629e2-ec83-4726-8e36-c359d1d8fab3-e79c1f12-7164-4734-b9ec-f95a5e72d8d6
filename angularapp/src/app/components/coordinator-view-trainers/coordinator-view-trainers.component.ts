// src/app/coordinator-view-trainers/coordinator-view-trainers.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';
import { Trainer } from 'src/app/models/trainer.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coordinator-view-trainers',
  templateUrl: './coordinator-view-trainers.component.html',
  styleUrls: ['./coordinator-view-trainers.component.css']
})
export class CoordinatorViewTrainersComponent implements OnInit, OnDestroy {
  trainers: Trainer[] = [];
  filteredTrainers: Trainer[] = [];

  searchTerm: string = '';
  filterStatus: string = 'All Status';
  statusOptions: string[] = ['All Status', 'Active', 'Inactive'];

  showDeleteConfirmModal: boolean = false;
  trainerToDeleteId: number | undefined;
  trainerToDeleteName: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  private trainersSubscription: Subscription | undefined;

  constructor(
    private trainerService: TrainerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTrainers();
  }

  ngOnDestroy(): void {
    if (this.trainersSubscription) {
      this.trainersSubscription.unsubscribe();
    }
  }

  loadTrainers(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.trainersSubscription = this.trainerService.getAllTrainer().subscribe({
      next: (data: Trainer[]) => {
        this.trainers = data;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error fetching trainers:', error);
        this.errorMessage = 'Failed to load trainers. Please try again.';
        this.trainers = [];
        this.applyFilters();
      }
    });
  }

  applyFilters(): void {
    let tempTrainers = [...this.trainers];

    if (this.searchTerm) {
      tempTrainers = tempTrainers.filter(trainer =>
        trainer.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.filterStatus !== 'All Status') {
      tempTrainers = tempTrainers.filter(trainer =>
        trainer.status === this.filterStatus
      );
    }

    this.filteredTrainers = tempTrainers;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterStatusChange(): void {
    this.applyFilters();
  }

  navigateToAddTrainer(): void {
    this.router.navigate(['/trainer-management']);
  }

  editTrainer(trainerId: number | undefined): void {
    if (trainerId) {
      this.router.navigate(['/trainer-management', trainerId]);
    } else {
      console.warn('Trainer ID is undefined for edit.');
      this.errorMessage = 'Cannot edit: Trainer ID is missing.';
    }
  }

  openDeleteConfirmModal(trainer: Trainer): void {
    if (trainer.trainerId === undefined) {
      console.error('Trainer ID is undefined. Cannot open delete confirmation.');
      return;
    }
    this.trainerToDeleteId = trainer.trainerId;
    this.trainerToDeleteName = trainer.name;
    this.showDeleteConfirmModal = true;
  }

  confirmDelete(): void {
    if (this.trainerToDeleteId === undefined) {
      console.error('No trainer selected for deletion.');
      this.cancelDelete();
      return;
    }

    this.trainerService.deleteTrainer(this.trainerToDeleteId).subscribe({
      next: () => {
        this.successMessage = 'Trainer deleted successfully!';
        this.loadTrainers();
        this.cancelDelete();
      },
      error: (err) => {
        console.error('Error deleting trainer:', err);
        this.errorMessage = 'Failed to delete trainer. Please try again.';
        this.cancelDelete();
      }
    });
  }

  cancelDelete(): void {
    this.showDeleteConfirmModal = false;
    this.trainerToDeleteId = undefined;
    this.trainerToDeleteName = '';
  }

  toggleTrainerStatus(trainer: Trainer): void {
    if (trainer.trainerId === undefined) {
      console.error('Trainer ID is undefined. Cannot toggle status.');
      return;
    }

    const newStatus = trainer.status === 'Active' ? 'Inactive' : 'Active';
    const updatedTrainer: Partial<Trainer> = { status: newStatus };

    this.trainerService.updateTrainer(trainer.trainerId, updatedTrainer).subscribe({
      next: () => {
        this.successMessage = `Trainer status updated to ${newStatus} successfully!`;
        this.loadTrainers();
      },
      error: (err) => {
        console.error('Error updating trainer status:', err);
        this.errorMessage = 'Failed to update trainer status. Please try again.';
      }
    });
  }

  viewResume(resumePath: string | undefined): void {
    if (resumePath) {
      alert(`Viewing Resume: ${resumePath}`);
    } else {
      alert('Resume path not available.');
    }
  }
}
