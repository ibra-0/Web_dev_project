import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.html',
  styleUrls: ['./clubs.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
})
export class ClubsComponent implements OnInit {
  clubs: any[] = [];
  userRole: string | null = '';

  newClubName = '';
  newClubCity = '';
  newClubBudget = 0;
  logoUrl = '';

  isLoading = false;
  myClubId: number | null = null;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
    const storedId = localStorage.getItem('myClubId');
    this.myClubId = storedId ? Number(storedId) : null;

    this.getClubs();
  }

  getClubs() {
    this.isLoading = true;

    this.api.getClubs().subscribe({
      next: (data: any) => {
        this.clubs = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading clubs:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  addClub() {
    if (this.userRole === 'user') {
      alert('You do not have permission to add clubs!');
      return;
    }

    if (!this.newClubName.trim()) {
      alert('Please enter a club name');
      return;
    }

    this.isLoading = true;

    const data = {
      name: this.newClubName,
      city: this.newClubCity,
      budget: this.newClubBudget,
      logo: this.logoUrl || null 
    };

    this.api.addClub(data).subscribe({
      next: () => {
        this.resetForm();
        this.getClubs();
      },
      error: (err) => {
        console.error('Error adding club:', err);
        this.isLoading = false;
      }
    });
  }

  deleteClub(id: number) {
    if (this.userRole !== 'superuser') {
      alert('Only administrators can delete clubs!');
      return;
    }

    if (confirm('Delete club?')) {
      this.isLoading = true;

      this.api.deleteClub(id).subscribe({
        next: () => this.getClubs(),
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
    }
  }

  resetForm() {
    this.newClubName = '';
    this.newClubCity = '';
    this.newClubBudget = 0;
    this.logoUrl = '';
  }
}