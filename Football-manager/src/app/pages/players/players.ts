import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-players',
  standalone: true,
  templateUrl: './players.html',
  styleUrls: ['./players.css'],
  imports: [FormsModule, CommonModule]
})
export class PlayersComponent implements OnInit {
  positions: string[] = ['GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'LW', 'RW', 'ST', 'CF'];
  players: any[] = [];
  filteredPlayers: any[] = [];
  clubs: any[] = [];
  searchQuery: string = "";
  userRole: string | null = '';

  newPlayer = {
    name: "",
    position: "ST",
    rating: null,
    age: null,
    price: null,
    club: null as number | null
  };

  constructor(private api: ApiService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    const savedRole = localStorage.getItem('userRole');
    this.userRole = savedRole ? savedRole : 'user';
    
    console.log("DEBUG: My role is ->", this.userRole)
    this.getPlayers();
    this.getClubs();
  }

  getClubs() {
    this.api.getClubs().subscribe((data: any) => {
      this.clubs = data;
      this.cdRef.detectChanges();
    });
  }

  getPlayers() {
    this.api.getPlayers().subscribe((data: any) => {
      this.players = data;
      this.filteredPlayers = [...data];
      this.sortByRating();
      this.cdRef.detectChanges();
    });
  }

  onSearch() {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredPlayers = this.players.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.position.toLowerCase().includes(query)
    );
    this.cdRef.detectChanges();
  }

  addPlayer() {
    if (this.userRole === 'user' || this.userRole === 'manager') return;
    // ВАЖНО: берем club из this.newPlayer.club
    const payload = {
      ...this.newPlayer,
      rating: Number(this.newPlayer.rating),
      age: Number(this.newPlayer.age),
      price: Number(this.newPlayer.price)
    };

    this.api.addPlayer(payload).subscribe({
      next: () => {
        this.getPlayers();
        this.resetForm();
      },
      error: (err) => console.log("Ошибка валидации:", err.error)
    });
  }

  resetForm() {
    this.newPlayer = { name: '', position: 'ST', rating: null, age: null, price: null, club: null };
  }

  sortByRating() {
    this.filteredPlayers.sort((a, b) => b.rating - a.rating);
    this.cdRef.detectChanges();
  }
  loadPlayers() {
  this.api.getPlayers().subscribe((data: any) => {
    this.players = data;
    this.cdRef.detectChanges(); // 3. Принудительно обновляем экран
  });
}
}