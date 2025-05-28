import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService, Feedback } from '../../services/feedback.service';
import { TrainerService } from '../../services/trainer.service';
import { Trainer } from '../../services/trainer.service';

@Component({
  selector: 'app-managerpostfeedback',
  templateUrl: './managerpostfeedback.component.html',
  styleUrls: ['./managerpostfeedback.component.css']
})
export class ManagerPostFeedbackComponent implements OnInit {
  feedbackForm!: FormGroup;
  trainerId: number | null = null;
  trainerName: string = 'Unknown Trainer';
  feedbackCategories: string[] = ['Positive', 'Constructive', 'General'];
  submitted: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  showSuccessModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private feedbackService: FeedbackService,
    private trainerService: TrainerService
  ) { }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      feedbackText: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('trainerId');
      if (id) {
        this.trainerId = +id;
        this.loadTrainerDetails(this.trainerId);
      } else {
        this.errorMessage = 'Trainer ID not provided.';
      }
    });
  }

  get f() { return this.feedbackForm.controls; }

  loadTrainerDetails(id: number): void {
    this.trainerService.getTrainerById(id).subscribe({
      next: (trainer: Trainer) => {
        this.trainerName = trainer.name || 'Unknown Trainer';
      },
      error: (err) => {
        console.error('Error fetching trainer details:', err);
        this.trainerName = 'Unknown Trainer';
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.feedbackForm.invalid) {
      return;
    }

    const feedbackData: Feedback = {
      userId: 1,
      trainerId: this.trainerId!,
      feedbackText: this.f['feedbackText'].value,
      category: this.f['category'].value,
      date: new Date()
    };

    this.feedbackService.sendFeedback(feedbackData).subscribe({
      next: (response) => {
        this.successMessage = 'Successfully Added!';
        this.feedbackForm.reset();
        this.submitted = false;
        this.showSuccessModal = true;
      },
      error: (error) => {
        console.error('Error posting feedback:', error);
        this.errorMessage = 'Failed to add feedback. Please try again.';
      }
    });
  }

  closeSuccessPopupAndNavigate(): void {
    this.showSuccessModal = false;
    this.successMessage = '';
    this.router.navigate(['/selected-trainers']);
  }
}