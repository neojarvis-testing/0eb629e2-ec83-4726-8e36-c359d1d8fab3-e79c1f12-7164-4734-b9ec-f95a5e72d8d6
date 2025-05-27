// manager-view-requirements.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Requirement } from 'src/app/models/requirement.model';
import { RequirementService } from 'src/app/services/requirement.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manager-view-requirements',
  templateUrl: './manager-view-requirements.component.html',
  styleUrls: ['./manager-view-requirements.component.css']
})
export class ManagerViewRequirementsComponent implements OnInit, OnDestroy {
  requirements: Requirement[] = []; // Holds all requirements
  filteredRequirements: Requirement[] = []; // Holds requirements after search/filter

  searchTerm: string = '';
  filterStatus: string = 'All Status'; // Default filter status

  statusOptions: string[] = ['All Status', 'Pending', 'Approved', 'Rejected', 'Assigned', 'Completed'];

  private requirementsSubscription: Subscription | undefined;

  constructor(private requirementService: RequirementService) { } // Inject the service

  ngOnInit(): void {
    // Subscribe to the requirements observable from the service
    this.requirementsSubscription = this.requirementService.getAllRequirements().subscribe({
      next: (data: Requirement[]) => {
        this.requirements = data; // Update local requirements array with data from service
        this.applyFilters(); // Apply filters initially and whenever data changes
      },
      error: (error) => {
        console.error('Error fetching requirements:', error);
        // In a real application, you might display a user-friendly error message
        this.requirements = []; // Clear requirements on error
        this.applyFilters(); // Ensure "No records found" is shown
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks when the component is destroyed
    if (this.requirementsSubscription) {
      this.requirementsSubscription.unsubscribe();
    }
  }

  /**
   * Applies search and status filters to the requirements list.
   */
  applyFilters(): void {
    let tempRequirements = [...this.requirements]; // Start with all requirements

    // Apply search term filter (case-insensitive title search)
    if (this.searchTerm) {
      tempRequirements = tempRequirements.filter(req =>
        req.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (this.filterStatus !== 'All Status') {
      tempRequirements = tempRequirements.filter(req =>
        req.status === this.filterStatus
      );
    }

    this.filteredRequirements = tempRequirements;
  }

  /**
   * Handles changes in the search input.
   */
  onSearchChange(): void {
    this.applyFilters();
  }

  /**
   * Handles changes in the status filter dropdown.
   */
  onFilterStatusChange(): void {
    this.applyFilters();
  }

  /**
   * Placeholder for action button click (e.g., View, Edit, Delete).
   * @param requirement The requirement object for which the action is performed.
   */
  performAction(requirement: Requirement): void {
    console.log('Action performed for requirement:', requirement);
    // Implement actual logic for view/edit/delete here
    // For example, navigate to an edit page: this.router.navigate(['/edit-requirement', requirement.requirementId]);
  }
}