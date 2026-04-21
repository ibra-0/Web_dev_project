import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  clubs: any[] = [];
  players: any[] = [];
  matches: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadStats();
  }

 loadStats() {
    this.api.getClubs().subscribe((data: any) => {
      this.clubs = data;
    });
    
    this.api.getPlayers().subscribe((data: any) => {
      this.players = data;
    });
    
    this.api.getMatches().subscribe((data: any) => {
      this.matches = data;
    });
  }
}