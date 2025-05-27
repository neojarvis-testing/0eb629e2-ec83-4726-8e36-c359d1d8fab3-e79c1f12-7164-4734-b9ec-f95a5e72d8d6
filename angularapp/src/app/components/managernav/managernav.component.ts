import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managernav',
  templateUrl: './managernav.component.html',
  styleUrls: ['./managernav.component.css']
})
export class ManagerNavComponent {

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token');  // Adjust if your token key differs
    this.router.navigate(['/login']);
  }
}
