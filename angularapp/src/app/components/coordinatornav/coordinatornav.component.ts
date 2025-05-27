import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coordinator-nav',
  templateUrl: './coordinatornav.component.html',
  styleUrls: ['./coordinatornav.component.css']
})
export class CoordinatornavComponent {

    constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
