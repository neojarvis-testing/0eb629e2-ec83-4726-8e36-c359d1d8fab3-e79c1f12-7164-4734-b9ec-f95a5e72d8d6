import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { TrainerService } from '../../services/trainer.service';
import { Feedback } from '../../models/feedback.model';
import { Trainer } from '../../models/trainer.model';
import { Subscription, forkJoin, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface FeedbackDisplay extends Feedback {
  trainerName?: string;
  trainerExpertise?: string;
  trainerEmail?: string;
  trainerPhone?: string;
}

@Component({
  selector: 'app-coordinatorviewfeedback',
  templateUrl: './coordinatorviewfeedback.component.html',
  styleUrls: ['./coordinatorviewfeedback.component.css']
})
export class CoordinatorViewFeedbackComponent implements OnInit, OnDestroy {
  feedbacks: FeedbackDisplay[] = [];
  filteredFeedbacks: FeedbackDisplay[] = [];
  categoryOptions: string[] = ['All Categories'];

  filterCategory: string = 'All Categories';
  

  showProfileModal: boolean = false;
  currentUserFeedbackDetails: FeedbackDisplay | null = null;

  showTrainerInfoModal: boolean = false;
  currentTrainerDetails: Trainer | null = null;

  errorMessage: string = '';
  isLoading: boolean = true;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private feedbackService: FeedbackService,
    private trainerService: TrainerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadFeedbacks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.subscriptions.add(
      this.feedbackService.getFeedbacks().pipe(
        switchMap(feedbacks => {
          if (feedbacks.length === 0) {
            return of([]);
          }

          const feedbackWithTrainerObservables = feedbacks.map(feedback => {
            const trainer$ = this.trainerService.getTrainerById(feedback.trainerId).pipe(
              catchError(() => {
                console.error(`Failed to load trainer ${feedback.trainerId}`);
                return of(null);
              })
            );
            return forkJoin([of(feedback), trainer$]);
          });
          return forkJoin(feedbackWithTrainerObservables);
        }),
        catchError(err => {
          this.errorMessage = 'Failed to load feedbacks. Please try again.';
          this.isLoading = false;
          console.error('Error fetching all feedbacks:', err);
          return of([]);
        })
      ).subscribe({
        next: (resultsArray) => {
          this.feedbacks = resultsArray.map(([feedback, trainer]) => {
            const displayFeedback: FeedbackDisplay = {
              ...feedback,
              trainerName: trainer ? trainer.name : 'Unknown Trainer',
              trainerExpertise: trainer ? trainer.expertise : 'N/A',
              trainerEmail: trainer ? trainer.email : 'N/A',
              trainerPhone: trainer ? trainer.phone : 'N/A',
            };
            return displayFeedback;
          });
          this.populateCategories();
          this.applyFilters();
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
        }
      })
    );
  }

  populateCategories(): void {
    const categories = new Set<string>();
    this.feedbacks.forEach(feedback => categories.add(feedback.category));
    this.categoryOptions = ['All Categories', ...Array.from(categories)];
  }

  applyFilters(): void {
    let tempFeedbacks = [...this.feedbacks];

    if (this.filterCategory !== 'All Categories') {
      tempFeedbacks = tempFeedbacks.filter(feedback =>
        feedback.category === this.filterCategory
      );
    }
    this.filteredFeedbacks = tempFeedbacks;
  }

  onFilterCategoryChange(): void {
    this.applyFilters();
  }

  showProfile(feedbackItem: FeedbackDisplay): void {
    this.currentUserFeedbackDetails = feedbackItem;
    this.showProfileModal = true;
  }

  closeProfileModal(): void {
    this.showProfileModal = false;
    this.currentUserFeedbackDetails = null;
  }

  viewTrainerInfo(trainerId: number): void {
    this.trainerService.getTrainerById(trainerId).subscribe({
      next: (trainer) => {
        this.currentTrainerDetails = trainer;
        this.showTrainerInfoModal = true;
      },
      error: (err) => {
        console.error('Error fetching trainer info:', err);
        this.errorMessage = 'Failed to load trainer information.';
      }
    });
  }

  closeTrainerInfoModal(): void {
    this.showTrainerInfoModal = false;
    this.currentTrainerDetails = null;
  }
}
