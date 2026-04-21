import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transfers',
  standalone: true,
  templateUrl: './transfers.html',
  styleUrls: ['./transfers.css'],
  imports: [FormsModule, CommonModule]
})
export class TransfersComponent implements OnInit {
  players: any[] = [];
  clubs: any[] = [];
  transfers: any[] = [];

  userRole: string | null = '';
  myClubId: number | null = null;

  selectedPlayerId: number | null = null;
  selectedClubId: number | null = null;
  transferPrice: number | null = null;

  selectedPlayer: any = null;
  minAllowedPrice: number = 0;
  maxAllowedPrice: number = 0;

  constructor(
    private http: HttpClient,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');

    const clubId = localStorage.getItem('userClubId');
    this.myClubId = clubId ? Number(clubId) : null;

    // 🔥 если менеджер — фиксируем его клуб
    if (this.userRole === 'manager' && this.myClubId) {
      this.selectedClubId = this.myClubId;
    }

    this.loadData();
    this.getTransferHistory();
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Token ${token}`
    });
  }

  loadData() {
    const headers = this.getAuthHeaders();

    // игроки
    this.http.get('http://127.0.0.1:8000/api/players/', { headers }).subscribe({
      next: (data: any) => this.players = data,
      error: (err) => console.error('Ошибка загрузки игроков:', err)
    });

    // клубы (нужно только если не менеджер)
    this.http.get('http://127.0.0.1:8000/api/clubs/', { headers }).subscribe({
      next: (data: any) => this.clubs = data,
      error: (err) => console.error('Ошибка загрузки клубов:', err)
    });
  }

  getTransferHistory() {
    const headers = this.getAuthHeaders();

    this.http.get('http://127.0.0.1:8000/api/transfers/', { headers }).subscribe({
      next: (data: any) => {
        this.transfers = data;
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Ошибка истории трансферов:', err)
    });
  }

  onPlayerSelect() {
    this.selectedPlayer = this.players.find(
      p => p.id === Number(this.selectedPlayerId)
    );

    if (this.selectedPlayer) {
      const basePrice = Number(this.selectedPlayer.price);
      this.minAllowedPrice = basePrice * 0.8;
      this.maxAllowedPrice = basePrice * 1.2;
    }
  }

  makeTransfer() {
    if (!this.selectedPlayerId || !this.transferPrice) {
      alert("Please fill all fields");
      return;
    }

    // 🔥 ключевая логика — менеджер не может выбрать чужой клуб
    const clubIdToUse =
      this.userRole === 'manager'
        ? this.myClubId
        : this.selectedClubId;

    if (!clubIdToUse) {
      alert("Club not selected");
      return;
    }

    const payload = {
      player_id: Number(this.selectedPlayerId),
      to_club_id: Number(clubIdToUse),
      price: this.transferPrice
    };

    this.http.post(
      'http://127.0.0.1:8000/api/transfers/',
      payload,
      { headers: this.getAuthHeaders() }
    ).subscribe({
      next: () => {
        alert("Transfer success!");
        this.loadData();
        this.getTransferHistory();
        this.resetForm();
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.error || "Server error during transfer");
      }
    });
  }

  resetForm() {
    this.selectedPlayerId = null;
    this.selectedClubId = this.myClubId; // 🔥 чтобы не сбрасывался клуб менеджера
    this.transferPrice = null;
    this.selectedPlayer = null;
  }
}