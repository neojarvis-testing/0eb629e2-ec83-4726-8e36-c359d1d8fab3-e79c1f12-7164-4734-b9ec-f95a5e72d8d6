import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-managernav',
  templateUrl: './managernav.component.html',
  styleUrls: ['./managernav.component.css']
})
export class ManagerNavComponent {


  showLogoutConfirmModal: boolean = false; // Controls the visibility of the logout modal

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  openLogoutConfirmModal(): void {
    this.showLogoutConfirmModal = true;
  }

  confirmLogout(): void {
    this.authService.logout(); // Call your authentication service's logout method
    this.showLogoutConfirmModal = false; // Close the modal
    this.router.navigate(['']); // Navigate to the login page
  }

  cancelLogout(): void {
    this.showLogoutConfirmModal = false; // Close the modal without logging out
  }
}
