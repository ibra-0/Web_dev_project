import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tournaments.html',
  styleUrls: ['./tournaments.css']
})
export class TournamentsComponent implements OnInit {
  // Данные из базы
  tournaments: any[] = [];
  clubs: any[] = [];
  allMatches: any[] = [];
  userRole: string | null = '';
  waitingTeams: any[] = [];
  currentRoundName: string = '';
  
  // Состояние текущего экрана
  selectedTournament: any = null;
  tournamentMatches: any[] = [];

  expandedTournamentId: number | null = null;
  expandedMatches: any[] = [];

  // Поля формы
  selectedClubIds: number[] = [];
  tName: string = '';
  tPrize: number = 0;
  tType: string = 'league';

  currentRoundMatches: any[] = [];
  tournamentWinner: number | null = null;
  currentLeagueRound: number = 0;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadData(); 
    this.userRole = localStorage.getItem('userRole');
  }

  // --- ЛОГИКА СОХРАНЕНИЯ СОСТОЯНИЯ ---
  
  private saveState() {
    if (!this.selectedTournament) return;
    const state = {
      currentLeagueRound: this.currentLeagueRound,
      currentRoundMatches: this.currentRoundMatches,
      currentRoundName: this.currentRoundName
    };
    localStorage.setItem(`t_state_${this.selectedTournament.id}`, JSON.stringify(state));
  }

  private loadState(tournamentId: number) {
    const saved = localStorage.getItem(`t_state_${tournamentId}`);
    if (saved) {
      const state = JSON.parse(saved);
      this.currentLeagueRound = state.currentLeagueRound || 0;
      this.currentRoundMatches = state.currentRoundMatches || [];
      this.currentRoundName = state.currentRoundName || '';
    } else {
      this.currentLeagueRound = 0;
      this.currentRoundMatches = [];
      this.currentRoundName = '';
    }
  }

  private clearState(tournamentId: number) {
    localStorage.removeItem(`t_state_${tournamentId}`);
  }

  // --- ОСНОВНЫЕ МЕТОДЫ ---

  get activeTournaments() {
    return this.tournaments.filter(t => !t.winner);
  }

  get finishedTournaments() {
    return this.tournaments.filter(t => t.winner);
  }

  loadData() {
    this.api.getClubs().subscribe({
      next: (data: any) => {
        this.clubs = data;
        this.cdr.detectChanges();
      }
    });

    this.api.getTournaments().subscribe({
      next: (data: any) => {
        this.tournaments = Array.isArray(data) ? data : [];
        this.cdr.detectChanges();
      }
    });

    this.api.getMatches().subscribe({
      next: (data: any) => {
        this.allMatches = Array.isArray(data) ? data : [];
        this.cdr.detectChanges();
      }
    });
  }

  viewTournament(tournament: any) {
    this.selectedTournament = tournament;
    this.loadState(tournament.id); // Восстанавливаем прогресс раундов
    
    this.api.getMatches().subscribe({
      next: (allMatches: any) => {
        this.tournamentMatches = allMatches.filter((m: any) => m.tournament == tournament.id);
        this.cdr.detectChanges();
      }
    });
  }

  selectTournament(t: any) {
    this.selectedTournament = t;
    this.tournamentMatches = this.allMatches.filter(m => m.tournament == t.id);
    this.loadState(t.id); // Восстанавливаем прогресс раундов
    this.tournamentWinner = null;
    this.cdr.detectChanges();
  }

  generateFirstRound() {
    if (!this.selectedTournament?.teams) return;
    
    let teams = [...this.selectedTournament.teams];
    const numTeams = teams.length;
    const nextPowerOfTwo = Math.pow(2, Math.floor(Math.log2(numTeams)));
    
    if (numTeams === 2) this.currentRoundName = 'Финал';
    else if (numTeams <= 4 && nextPowerOfTwo === 4) this.currentRoundName = 'Полуфинал';
    else if (numTeams <= 8 && nextPowerOfTwo === 8) this.currentRoundName = '1/4 Финала';
    else this.currentRoundName = 'Отборочный раунд';

    teams.sort(() => Math.random() - 0.5);

    const teamsToPlayCount = (numTeams - nextPowerOfTwo) * 2;
    const roundMatches = [];
    const playingTeams = teams.splice(0, teamsToPlayCount);
    const waiting = teams;

    for (let i = 0; i < playingTeams.length; i += 2) {
      roundMatches.push({
        home_team: playingTeams[i],
        away_team: playingTeams[i + 1],
        home_score: 0,
        away_score: 0,
        is_played: false,
        round_name: this.currentRoundName
      });
    }

    for (const teamId of waiting) {
      roundMatches.push({
        home_team: teamId,
        away_team: null,
        home_score: 0,
        away_score: 0,
        is_played: true,
        round_name: this.currentRoundName
      });
    }

    this.currentRoundMatches = roundMatches;
    this.saveState(); // Сохраняем сетку
    this.cdr.detectChanges();
  }

  playPlayoffRound() {
    if (this.userRole === 'user') return;

    let nextRoundTeams: number[] = [];
    const playedMatchesThisRound: any[] = [];

    this.currentRoundMatches.forEach(match => {
      if (!match.away_team) {
        nextRoundTeams.push(match.home_team);
        return;
      }

      match.home_score = Math.floor(Math.random() * 5);
      match.away_score = Math.floor(Math.random() * 5);
      while (match.home_score === match.away_score) {
        Math.random() > 0.5 ? match.home_score++ : match.away_score++;
      }
      
      match.is_played = true;
      const matchData = {
        tournament: this.selectedTournament.id,
        home_team: match.home_team,
        away_team: match.away_team,
        home_score: match.home_score,
        away_score: match.away_score,
        is_played: true,
        round_name: this.currentRoundName
      };

      this.api.createMatch(matchData).subscribe();
      playedMatchesThisRound.push({...match});
      nextRoundTeams.push(match.home_score > match.away_score ? match.home_team : match.away_team);
    });

    this.tournamentMatches = [...this.tournamentMatches, ...playedMatchesThisRound];

    setTimeout(() => {
      if (nextRoundTeams.length === 1) {
        this.tournamentWinner = nextRoundTeams[0];
        this.finishTournament(this.tournamentWinner); 
      } else {
        this.setupNextRound(nextRoundTeams);
      }
      this.saveState(); // Сохраняем прогресс после раунда
      this.cdr.detectChanges();
    }, 1000);
  }

  setupNextRound(teams: number[]) {
    this.currentRoundMatches = [];
    const n = teams.length;

    if (n === 2) this.currentRoundName = 'Финал';
    else if (n === 4) this.currentRoundName = 'Полуфинал';
    else if (n <= 8) this.currentRoundName = '1/4 Финала';
    else this.currentRoundName = 'Следующий раунд';

    for (let i = 0; i < teams.length; i += 2) {
      if (teams[i + 1]) {
        this.currentRoundMatches.push({
          home_team: teams[i],
          away_team: teams[i + 1],
          home_score: 0,
          away_score: 0,
          is_played: false,
          round_name: this.currentRoundName
        });
      } else {
        this.currentRoundMatches.push({ 
          home_team: teams[i], away_team: null, is_played: true, round_name: this.currentRoundName 
        });
      }
    }
    this.saveState();
  }

  playLeagueRound() {
    if (this.userRole === 'user' || !this.selectedTournament) return;
    
    this.currentLeagueRound++;
    const teams = this.selectedTournament.teams;
    const newMatches: any[] = [];

    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams.length; j++) {
        if (i === j) continue;
        if ((this.currentLeagueRound === 1 && i < j) || (this.currentLeagueRound === 2 && i > j)) {
          const matchData = {
            tournament: this.selectedTournament.id,
            home_team: teams[i],
            away_team: teams[j],
            home_score: Math.floor(Math.random() * 5),
            away_score: Math.floor(Math.random() * 5),
            is_played: true
          };
          this.api.createMatch(matchData).subscribe();
          newMatches.push(matchData);
        }
      }
    }
    this.tournamentMatches = [...this.tournamentMatches, ...newMatches];
    this.saveState(); // Сохраняем номер круга

    if (this.currentLeagueRound >= 2) {
      const standings = this.calculateStandings(this.tournamentMatches, teams);
      this.finishTournament(standings[0].id);
    }
    this.cdr.detectChanges();
  }

  finishTournament(winnerId: number) {
    const tId = this.selectedTournament.id;
    this.api.finishTournament(tId, winnerId).subscribe({
      next: () => {
        this.clearState(tId); // Удаляем кэш, турнир завершен
        this.loadData();
        this.selectedTournament = null;
        this.cdr.detectChanges();
      }
    });
  }

  // --- ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ (БЕЗ ИЗМЕНЕНИЙ) ---

  getClubName(clubId: number | undefined | null): string {
    if (!clubId || !this.clubs) return 'Unknown Club';
    const club = this.clubs.find(c => c.id === clubId);
    return club ? club.name : 'Unknown Club';
  }

  toggleClub(clubId: number) {
    if (this.selectedClubIds.includes(clubId)) {
      this.selectedClubIds = this.selectedClubIds.filter(id => id !== clubId);
    } else {
      this.selectedClubIds.push(clubId);
    }
  }

  createTournament() {
    if (this.userRole === 'user' || this.selectedClubIds.length < 2) return;
    const data = { name: this.tName, prize_money: this.tPrize, tournament_type: this.tType, teams: this.selectedClubIds };
    this.api.createTournament(data).subscribe({ next: () => this.loadData() });
  }

  calculateStandings(matches: any[], teams: any[]) {
    let stats = teams.map(id => ({ id, name: this.getClubName(id), p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }));
    matches.forEach(m => {
      const home = stats.find(s => s.id === m.home_team);
      const away = stats.find(s => s.id === m.away_team);
      if (!home || !away) return;
      home.p++; away.p++; home.gf += m.home_score; home.ga += m.away_score;
      away.gf += m.away_score; away.ga += m.home_score;
      if (m.home_score > m.away_score) { home.w++; home.pts += 3; away.l++; }
      else if (m.home_score < m.away_score) { away.w++; away.pts += 3; home.l++; }
      else { home.d++; home.pts += 1; away.d++; away.pts += 1; }
      home.gd = home.gf - home.ga; away.gd = away.gf - away.ga;
    });
    return stats.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.w - a.w);
  }

  closeDetails() {
    this.selectedTournament = null;
    this.currentRoundMatches = [];
    this.cdr.detectChanges();
  }

  deleteTournament(id: number) {
    if (this.userRole !== 'superuser') return;
    if (confirm('Удалить турнир?')) {
      this.api.deleteTournament(id).subscribe({ next: () => this.loadData() });
    }
  }
}