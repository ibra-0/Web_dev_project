import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; 
import { ApiService } from '../../services/api';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class LoginComponent {
  username = "";
  password = "";

  constructor(private api: ApiService, private router: Router,private http: HttpClient,) {}

login() {
  this.api.login({
  username: this.username,
  password: this.password
}).subscribe({
  next: (res: any) => {
    localStorage.setItem('token', res.token);
    localStorage.setItem('userRole', res.role);

    if (res.club_id) {
      localStorage.setItem('userClubId', String(res.club_id));
    }

    if (res.club_name) {
      localStorage.setItem('clubName', res.club_name);
    }

    this.api.updateAuthStatus();
    this.router.navigate(['/clubs']);
  }
});
}
}