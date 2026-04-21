import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { ApiService } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-matches',
  standalone: true, 
  templateUrl: './matches.html',
  styleUrls: ['./matches.css'],
  imports: [FormsModule, CommonModule] 
})
export class MatchesComponent implements OnInit {
  
  clubs: any[] = [];
  matches: any[] = [];
  homeClub: number | null = null;
  awayClub: number | null = null;
  homeScore = null;
  awayScore = null;
  userRole: string | null = '';

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadData(); 
    this.userRole = localStorage.getItem('userRole');
  }

  loadData() {
    this.api.getClubs().subscribe({
      next: (data: any) => {
        this.clubs = data;
        this.cdr.detectChanges(); 
      }
    });

    this.api.getMatches().subscribe({
      next: (data: any) => {
        this.matches = Array.isArray(data) ? data : []; 
        this.cdr.detectChanges(); 
      },
      
      
      error: (err) => console.error('Error loading matches', err)
    });
  }

  getClubName(clubId: number): string {
    const club = this.clubs.find(c => c.id === clubId);
    return club ? club.name : `Club #${clubId}`;
  }

createMatch() {
  if (this.userRole === 'user') {
      alert("У вас нет прав для создания матчей!");
      return;
    }
  if (this.homeClub === null || this.awayClub === null) {
    alert("Выберите оба клуба!");
    return;
  }

  const data = {
    home_team: Number(this.homeClub),
    away_team: Number(this.awayClub),
    home_score: this.homeScore !== null ? Number(this.homeScore) : 0,
    away_score: this.awayScore !== null ? Number(this.awayScore) : 0,
    is_played: true,
    tournament: null 
  };

  console.log('Отправляемые данные:', data);

  this.api.createMatch(data).subscribe({
    next: (response) => {
      console.log('✅ Успех:', response);
      this.resetForm();
      this.loadData();
    },
    error: (err) => {
      console.error('❌ Ошибка сервера (500):', err);
      alert("Ошибка на стороне сервера. Проверь терминал Django.");
    }
  });
}
resetForm() {
    this.homeClub = null;
    this.awayClub = null;
    this.homeScore = null;
    this.awayScore = null;
    this.cdr.detectChanges();
  }
getClubLogo(clubId: number): string {
  const club = this.clubs.find(c => c.id === clubId);

  if (club?.logo) {
          return club.logo;
  }

  return 'assets/default-logo.png';
}
}