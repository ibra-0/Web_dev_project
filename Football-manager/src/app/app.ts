import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from './services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  userRole = '';
  myClub = '';
  userRoleDisplay = ''; // ДОБАВЬ ЭТУ СТРОКУ, чтобы убрать ошибки TS2339

  constructor(public api: ApiService, public router: Router) {}

  ngOnInit() {
  this.api.authStatus$.subscribe(status => {
    this.isLoggedIn = status;
  });

  // 🔥 БЕРЕМ НАПРЯМУЮ
  const role = localStorage.getItem('userRole');

  if (role === 'superuser') {
    this.userRoleDisplay = 'Администратор';
  } else if (role === 'manager') {
    this.userRoleDisplay = 'Менеджер';
  } else {
    this.userRoleDisplay = 'Болельщик';
  }
}

  logout() {
    this.api.logout();
    this.router.navigate(['/login']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}