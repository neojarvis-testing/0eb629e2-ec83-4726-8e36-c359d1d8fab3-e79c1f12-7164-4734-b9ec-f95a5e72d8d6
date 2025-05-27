
import { Component, OnInit } from '@angular/core';
import { FeedbackService, Feedback } from '../../services/feedback.service';
import { Router } from '@angular/router';
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
  currentManagerId: number = 1; // This should ideally come from an authentication service

  showTrainerDetailsModal: boolean = false;
  currentTrainerDetails: Trainer | undefined;
  trainerDetailsError: string = '';

  constructor(
    private feedbackService: FeedbackService,
    private router: Router,
    private trainerService: TrainerService // Inject TrainerService
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
          this.showTrainerDetailsModal = true; // Show the modal
        },
        error: (err) => {
          console.error('Error fetching trainer details for modal:', err);
          this.trainerDetailsError = 'Failed to load trainer details.';
          this.showTrainerDetailsModal = true; // Still show modal to display error
        }
      });
    } else {
      console.warn('Trainer ID is undefined for view trainer info.');
      this.trainerDetailsError = 'Trainer ID not available.';
      this.showTrainerDetailsModal = true; // Still show modal to display error
    }
  }

  closeTrainerDetailsModal(): void {
    this.showTrainerDetailsModal = false;
    this.currentTrainerDetails = undefined; // Clear trainer details
    this.trainerDetailsError = ''; // Clear any previous error
  }

  deleteFeedback(feedbackId: number | undefined): void {
    if (feedbackId === undefined) {
      console.error('Feedback ID is undefined. Cannot delete.');
      return;
    }

    if (confirm('Are you sure you want to delete this feedback?')) {
      this.feedbackService.deleteFeedback(feedbackId).subscribe({
        next: () => {
          this.successMessage = 'Feedback deleted successfully!';
          this.loadFeedback(); // Refresh the list
        },
        error: (err) => {
          console.error('Error deleting feedback:', err);
          this.errorMessage = 'Failed to delete feedback. Please try again.';
        }
      });
    }
  }
}
