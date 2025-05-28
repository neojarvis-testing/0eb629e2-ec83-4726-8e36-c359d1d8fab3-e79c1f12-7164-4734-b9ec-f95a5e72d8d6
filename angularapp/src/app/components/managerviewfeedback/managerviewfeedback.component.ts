
import { Component, OnInit } from '@angular/core';
import { FeedbackService, Feedback } from '../../services/feedback.service';
import { Router } from '@angular/router'
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({  
  selector: 'app-managerviewfeedback',
  templateUrl: './managerviewfeedback.component.html',
  styleUrls: ['./managerviewfeedback.component.css']
})
export class ManagerViewFeedbackComponent implements OnInit {
 feedbackList: Feedback[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  currentManagerId: number = 1;

  showTrainerDetailsModal: boolean = false;
  currentTrainerDetails: Trainer | undefined;
  trainerDetailsError: string = '';

  showDeleteConfirmModal: boolean = false; // New: State for delete confirmation modal
  feedbackToDeleteId: number | undefined; // New: Stores the ID of the feedback to be deleted

  constructor(
    private feedbackService: FeedbackService,
    private router: Router,
    private trainerService: TrainerService
  ) { }

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.feedbackService.getAllFeedbackByUserId(this.currentManagerId).subscribe({
      next: (data: Feedback[]) => {
        this.feedbackList = data;
        if (this.feedbackList.length === 0) {
          this.errorMessage = 'Oops! No Data found.';
        }
      },
      error: (err) => {
        console.error('Error fetching feedback:', err);
        this.errorMessage = 'Failed to load feedback. Please try again.';
      }
    });
  }

  viewTrainerInfo(trainerId: number | undefined): void {
    this.trainerDetailsError = '';
    if (trainerId) {
      this.trainerService.getTrainerById(trainerId).subscribe({
        next: (trainer: Trainer) => {
          this.currentTrainerDetails = trainer;
          this.showTrainerDetailsModal = true;
        },
        error: (err) => {
          console.error('Error fetching trainer details for modal:', err);
          this.trainerDetailsError = 'Failed to load trainer details.';
          this.showTrainerDetailsModal = true;
        }
      });
    } else {
      console.warn('Trainer ID is undefined for view trainer info.');
      this.trainerDetailsError = 'Trainer ID not available.';
      this.showTrainerDetailsModal = true;
    }
  }

  closeTrainerDetailsModal(): void {
    this.showTrainerDetailsModal = false;
    this.currentTrainerDetails = undefined;
    this.trainerDetailsError = '';
  }

  // New: Method to open the delete confirmation modal
  openDeleteConfirmModal(feedbackId: number | undefined): void {
    if (feedbackId === undefined) {
      console.error('Feedback ID is undefined. Cannot open delete confirmation.');
      return;
    }
    this.feedbackToDeleteId = feedbackId;
    this.showDeleteConfirmModal = true;
  }

  // New: Method to confirm deletion
  confirmDelete(): void {
    if (this.feedbackToDeleteId === undefined) {
      console.error('No feedback selected for deletion.');
      this.cancelDelete(); // Close modal if no ID
      return;
    }

    this.feedbackService.deleteFeedback(this.feedbackToDeleteId).subscribe({
      next: () => {
        this.successMessage = 'Feedback deleted successfully!';
        this.loadFeedback(); // Refresh the list
        this.cancelDelete(); // Close the modal
      },
      error: (err) => {
        console.error('Error deleting feedback:', err);
        this.errorMessage = 'Failed to delete feedback. Please try again.';
        this.cancelDelete(); // Close the modal
      }
    });
  }

  // New: Method to cancel deletion
  cancelDelete(): void {
    this.showDeleteConfirmModal = false;
    this.feedbackToDeleteId = undefined;
  }
}
