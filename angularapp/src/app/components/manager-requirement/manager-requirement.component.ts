import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manager-requirement',
  templateUrl: './manager-requirement.component.html',
  styleUrls: ['./manager-requirement.component.css']
})
export class ManagerRequirementComponent implements OnInit {
  requirementForm!: FormGroup; // Declare requirementForm as FormGroup

  // Sample data for dropdowns
  modes = ['Online', 'Offline', 'Hybrid'];
  skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  priorities = ['Low', 'Medium', 'High', 'Urgent'];

  // Variables for the success popup
  showSuccessPopup: boolean = false;
  successMessage: string = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.requirementForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      department: ['', Validators.required],
      duration: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Only numbers
      mode: ['', Validators.required],
      location: ['', Validators.required],
      skillLevel: ['', Validators.required],
      budget: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]], // Numbers, optional decimals
      priority: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields in the template
  get f() { return this.requirementForm.controls; }

  onSubmit(): void {
    if (this.requirementForm.invalid) {
      // Mark all fields as touched to display validation messages
      this.requirementForm.markAllAsTouched();
      console.log('Form is invalid. Please check the fields.');
      return;
    }

    // Form is valid, simulate a successful submission
    console.log('Form Submitted!', this.requirementForm.value);

    // Simulate an asynchronous operation (e.g., an HTTP request)
    // In a real application, you would subscribe to your service call here.
    setTimeout(() => {
      this.successMessage = 'Requirement Added Successfully!';
      this.showSuccessPopup = true;
      this.requirementForm.reset(); // Optionally reset the form after successful submission
      // Reset dropdowns to their default placeholder
      this.f['mode'].setValue('');
      this.f['skillLevel'].setValue('');
      this.f['priority'].setValue('');
    }, 1000); // Simulate a 1-second delay for API call
  }

  // Method to close the success popup
  closePopup(): void {
    this.showSuccessPopup = false;
    this.successMessage = ''; // Clear the message
  }
}