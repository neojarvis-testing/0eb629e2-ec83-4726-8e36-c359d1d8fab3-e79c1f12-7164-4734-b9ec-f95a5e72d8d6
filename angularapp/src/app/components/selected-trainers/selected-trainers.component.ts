
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, forkJoin, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { RequirementService, Requirement } from '../../services/requirement.service';
import { TrainerService, Trainer } from '../../services/trainer.service';

interface SelectedTrainerDisplay {
  trainerId: number;
  name: string;
  email: string;
  phone: string;
  expertise: string;
  experience: string;
  certification: string;
  requirementTitle: string;
  requirementStatus: string;
}

@Component({
  selector: 'app-selected-trainers',
  templateUrl: './selected-trainers.component.html',
  styleUrls: ['./selected-trainers.component.css']
})
export class SelectedTrainersComponent implements OnInit, OnDestroy {
  selectedTrainers: SelectedTrainerDisplay[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  private subscriptions: Subscription = new Subscription();

  constructor(
    private requirementService: RequirementService,
    private trainerService: TrainerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSelectedTrainers();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadSelectedTrainers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.subscriptions.add(
      this.requirementService.getAllRequirements().pipe(
        map(requirements => {
          return requirements.filter(req =>
            (req.status === 'Closed' || req.status === 'Assigned') && req.assignedTrainerId !== undefined && req.assignedTrainerId !== null
          );
        }),
        switchMap(filteredRequirements => {
          if (filteredRequirements.length === 0) {
            return of([]);
          }

          const trainerRequests: Observable<SelectedTrainerDisplay>[] = filteredRequirements.map(req => {
            const currentTrainerId: number = req.assignedTrainerId ?? 0;

            return this.trainerService.getTrainerById(currentTrainerId).pipe(
              map(trainer => ({
                trainerId: trainer?.trainerId ?? currentTrainerId,
                name: trainer?.name ?? 'Unknown Trainer',
                email: trainer?.email ?? 'N/A',
                phone: trainer?.phone ?? 'N/A',
                expertise: trainer?.expertise ?? 'N/A',
                experience: trainer?.experience ?? 'N/A',
                certification: trainer?.certification ?? 'N/A',
                requirementTitle: req.title,
                requirementStatus: req.status
              })),
              catchError(trainerErr => {
                console.error(`Error fetching trainer ${currentTrainerId} for requirement ${req.requirementId}:`, trainerErr);
                return of({
                  trainerId: currentTrainerId,
                  name: 'Unknown Trainer',
                  email: 'N/A',
                  phone: 'N/A',
                  expertise: 'N/A',
                  experience: 'N/A',
                  certification: 'N/A',
                  requirementTitle: req.title,
                  requirementStatus: req.status
                });
              })
            );
          });
          return forkJoin(trainerRequests);
        }),
        catchError(err => {
          this.errorMessage = 'Failed to load selected trainers. Please try again later.';
          this.isLoading = false;
          console.error('Error loading selected trainers:', err);
          return of([]);
        })
      ).subscribe({
        next: (data) => {
          this.selectedTrainers = data;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    );
  }

  writeReview(trainerId: number): void {
    this.router.navigate(['/manager-post-feedback', trainerId]);
  }

  refreshTrainers(): void {
    this.loadSelectedTrainers();
  }
}