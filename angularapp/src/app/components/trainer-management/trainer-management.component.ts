import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainerService } from 'src/app/services/trainer.service';
import { Trainer } from 'src/app/models/trainer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer-management',
  templateUrl: './trainer-management.component.html',
  styleUrls: ['./trainer-management.component.css']
})
export class TrainerManagementComponent implements OnInit {
  trainerForm!: FormGroup;

  expertises = ['Frontend', 'Backend', 'Fullstack', 'DevOps', 'Mobile', 'Data Science', 'UI/UX'];
  experiences = ['0-1 Year', '1-3 Years', '3-5 Years', '5-10 Years', '10+ Years'];
  statuses: ('Active' | 'Inactive')[] = ['Active', 'Inactive'];
  certificationsList = ['None', 'AWS Certified Developer', 'Azure Fundamentals', 'Google Cloud Professional', 'PMP', 'CSM', 'Other'];

  showSuccessPopup: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private trainerService: TrainerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.trainerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      expertise: ['', Validators.required],
      experience: ['', Validators.required],
      certification: ['', Validators.required],
      resume: ['', Validators.required],
      joiningDate: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get f() { return this.trainerForm.controls; }

  onSubmit(): void {
    this.errorMessage = '';
    if (this.trainerForm.invalid) {
      this.trainerForm.markAllAsTouched();
      console.log('Form is invalid. Please check the fields.');
      return;
    }

    const formValue = this.trainerForm.value;

    const newTrainer: Trainer = {
      name: formValue.name,
      email: formValue.email,
      phone: formValue.phone,
      expertise: formValue.expertise,
      experience: formValue.experience,
      certification: formValue.certification,
      resume: formValue.resume,
      joiningDate: new Date(formValue.joiningDate),
      status: formValue.status
    };

    this.trainerService.addTrainer(newTrainer).subscribe({
      next: (response) => {
        this.successMessage = 'Trainer Added Successfully!';
        this.showSuccessPopup = true;
        this.trainerForm.reset();
        this.resetDropdowns();
      },
      error: (error) => {
        console.error('Error adding trainer:', error);
        this.errorMessage = 'Failed to add trainer. Please try again.';
      }
    });
  }

  private resetDropdowns(): void {
    this.f['expertise'].setValue('');
    this.f['experience'].setValue('');
    this.f['status'].setValue('');
    this.f['certification'].setValue('');
  }

  closePopup(): void {
    this.showSuccessPopup = false;
    this.successMessage = '';
  }
}
