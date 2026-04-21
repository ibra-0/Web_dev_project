import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api'; // Проверь путь к сервису

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent implements OnInit {
  // Поля формы
  username = '';
  password = '';
  role = 'user'; // По умолчанию обычный юзер
  selectedClubId: number | null = null;
  
  availableClubs: any[] = []; // Список клубов для выбора менеджером

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadClubs();
  }

  loadClubs() {
  // Добавляем параметр ?available=true в URL
  this.http.get('http://127.0.0.1:8000/api/clubs/?available=true').subscribe({
    next: (data: any) => {
      this.availableClubs = data;
    },
    error: (err: any) => console.error(err)
  });
}

  register() {

  const userData = {
    username: this.username,
    password: this.password,
    role: this.role,
    club_id: this.role === 'manager'
      ? Number(this.selectedClubId)
      : null
  };

  console.log('REGISTER PAYLOAD:', userData);

  this.api.register(userData).subscribe({
    next: () => {

      this.api.login({
        username: this.username,
        password: this.password
      }).subscribe((res: any) => {

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
      });

    },
    error: (err) => {
      console.error('Ошибка регистрации:', err);
      alert(JSON.stringify(err.error));
    }
  });
}

}