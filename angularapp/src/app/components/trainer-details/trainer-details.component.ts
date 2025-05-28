
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TrainerService, Trainer } from '../../services/trainer.service'; // Adjust path if necessary
import { RequirementService, Requirement } from '../../services/requirement.service'; // Adjust path if necessary
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Import DomSanitizer

@Component({
  selector: 'app-trainer-details',
  templateUrl: './trainer-details.component.html',
  styleUrls: ['./trainer-details.component.css']
})
export class TrainerDetailsComponent implements OnInit, OnDestroy {
  trainer: Trainer | undefined;
  requirement: Requirement | undefined; // The specific requirement related to this trainer view
  trainerId: number | null = null;
  requirementId: number | null = null;

  showResumeModal: boolean = false;
  resumeSafeUrl: SafeResourceUrl = ''; // Use SafeResourceUrl for iframe src

  private routeSubscription: Subscription | undefined;
  private trainerSubscription: Subscription | undefined;
  private requirementSubscription: Subscription | undefined;
  private resumeSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainerService: TrainerService,
    private requirementService: RequirementService, // Inject RequirementService
    private sanitizer: DomSanitizer // Inject DomSanitizer
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.trainerId = +params.get('trainerId')!; // Get trainerId from route
      this.requirementId = +params.get('requirementId')!; // Get requirementId from route (if passed)

      if (this.trainerId) {
        this.loadTrainerDetails(this.trainerId);
      } else {
        console.warn('Trainer ID not provided in route. Redirecting to home.');
        this.router.navigate(['/']); // Redirect to home or a trainers list
      }

      // Load requirement details only if requirementId is present
      if (this.requirementId) {
        this.loadRequirementDetails(this.requirementId);
      } else {
        console.log('Requirement ID not provided in route. Displaying trainer details only.');
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.trainerSubscription?.unsubscribe();
    this.requirementSubscription?.unsubscribe();
    this.resumeSubscription?.unsubscribe();
  }

  loadTrainerDetails(id: number): void {
    this.trainerSubscription = this.trainerService.getTrainerById(id).subscribe({
      next: (trainerData) => {
        if (trainerData) {
          this.trainer = trainerData;
        } else {
          console.error(`Trainer with ID ${id} not found.`);
          this.router.navigate(['/']); // Redirect if trainer not found
        }
      },
      error: (err) => {
        console.error('Error loading trainer details:', err);
        // Handle error, e.g., show error message to the user
        alert('Failed to load trainer details. Please try again.');
        this.router.navigate(['/']); // Redirect on error
      }
    });
  }

  loadRequirementDetails(id: number): void {
    this.requirementSubscription = this.requirementService.getRequirementById(id).subscribe({
      next: (reqData) => {
        if (reqData) {
          this.requirement = reqData;
        } else {
          console.warn(`Requirement with ID ${id} not found.`);
          // This is a warning, as the component might still display trainer details
        }
      },
      error: (err) => {
        console.error('Error loading requirement details:', err);
        // Handle error for requirement details if necessary
      }
    });
  }

  viewResume(): void {
    // Now using trainer.resume as the identifier for the document
    if (this.trainer?.resume) {
      this.resumeSubscription = this.trainerService.fetchResumeDocument(this.trainer.resume).subscribe({
        next: (blob) => {
          // Create a blob URL for the PDF
          const objectUrl = URL.createObjectURL(blob);
          this.resumeSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
          this.showResumeModal = true;
        },
        error: (err) => {
          console.error('Error fetching resume document:', err);
          alert('Could not load resume. Please ensure the file exists and is accessible.');
        }
      });
    } else {
      alert('Resume not available for this trainer.');
    }
  }

  closeResumeModal(): void {
    this.showResumeModal = false;
    // Revoke the object URL to free up memory
    if (this.resumeSafeUrl) {
      URL.revokeObjectURL(this.resumeSafeUrl.toString()); // Convert SafeResourceUrl back to string
    }
    this.resumeSafeUrl = ''; // Clear the URL when closing
  }

  acceptTrainer(): void {
    if (this.trainerId && this.requirementId) {
      this.trainerService.acceptTrainer(this.trainerId, this.requirementId).subscribe({
        next: (success) => {
          if (success) {
            alert('Trainer accepted successfully!');
            this.router.navigate(['/manager-view-requirements']); // Redirect after action
          } else {
            alert('Failed to accept trainer.');
          }
        },
        error: (err) => {
          console.error('Error accepting trainer:', err);
          alert('An error occurred while accepting trainer.');
        }
      });
    } else {
      alert('Cannot accept trainer: Missing Trainer ID or Requirement ID.');
    }
  }

  rejectTrainer(): void {
    if (this.trainerId && this.requirementId) {
      this.trainerService.rejectTrainer(this.trainerId, this.requirementId).subscribe({
        next: (success) => {
          if (success) {
            alert('Trainer rejected.');
            this.router.navigate(['/manager-view-requirements']); // Redirect after action
          } else {
            alert('Failed to reject trainer.');
          }
        },
        error: (err) => {
          console.error('Error rejecting trainer:', err);
          alert('An error occurred while rejecting trainer.');
        }
      });
    } else {
      alert('Cannot reject trainer: Missing Trainer ID or Requirement ID.');
    }
  }
}