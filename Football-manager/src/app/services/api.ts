import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:8000/api/';
  private authStatus = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  private isLoggedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLogged$ = this.isLoggedSubject.asObservable();
  authStatus$ = this.authStatus.asObservable();
  constructor(private http: HttpClient) {}

  // Вспомогательный метод для получения заголовков с токеном
  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': token ? `Token ${token}` : ''
    });
  }
  private hasToken(): boolean {
  return !!localStorage.getItem('token');
}

  // --- AUTH ---
userProfile$ = new BehaviorSubject<{
  role: string,
  clubName: string | null,
  clubId: number | null
}>({
  role: localStorage.getItem('userRole') || 'guest',
  clubName: localStorage.getItem('clubName'),
  clubId: Number(localStorage.getItem('userClubId')) || null
});
login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}login/`, credentials);
  }
updateLoginStatus() {
  this.isLoggedSubject.next(this.hasToken());
}
  // Метод, который вызывает твой SignupComponent
register(userData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}register/`, userData);
}
updateAuthStatus() {
    // Обновляем значение: берем свежий статус из localStorage
    this.authStatus.next(!!localStorage.getItem('token'));
   this.userProfile$.next({
  role: localStorage.getItem('userRole') || 'guest',
  clubName: localStorage.getItem('clubName'),
  clubId: Number(localStorage.getItem('userClubId')) || null
});
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userClubId');
    this.updateAuthStatus();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // --- CLUBS ---

getClubs(): Observable<any[]> {
  const token = localStorage.getItem('token');

  if (!token) {
    // 🔥 если нет токена — используем публичный запрос
    return this.http.get<any[]>(`${this.apiUrl}clubs/`);
  }

  return this.http.get<any[]>(`${this.apiUrl}clubs/`, {
    headers: this.getHeaders()
  });
}

getAvailableClubsPublic(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}clubs/`); 
}

getPublicClubs(): Observable<any[]> {
  // Важно: здесь мы НЕ передаем { headers: this.getHeaders() }
  // чтобы запрос прошел без токена (Unauthorized ошибка уйдет)
  return this.http.get<any[]>(`${this.apiUrl}clubs/`);
}

  addClub(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}clubs/`, data, { headers: this.getHeaders() });
  }

  deleteClub(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}clubs/${id}/`, { headers: this.getHeaders() });
  }

  // --- PLAYERS ---

  getPlayers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}players/`, { headers: this.getHeaders() });
  }

  getPlayersByClub(clubId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}players/?club=${clubId}`, { headers: this.getHeaders() });
  }

  addPlayer(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}players/`, data, { headers: this.getHeaders() });
  }

  updatePlayer(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}players/${id}/`, data, { headers: this.getHeaders() });
  }

  // --- TRANSFERS ---

  makeTransfer(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}transfers/`, data, { headers: this.getHeaders() });
  }

  getTransfers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}transfers/`, { headers: this.getHeaders() });
  }

  // --- MATCHES ---

  getMatches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}matches/`, { headers: this.getHeaders() });
  }

  createMatch(matchData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}matches/`, matchData, { headers: this.getHeaders() });
  }

  getMatchesByTournament(tournamentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}matches/?tournament=${tournamentId}`, { headers: this.getHeaders() });
  }

  // --- TOURNAMENTS ---

  getTournaments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}tournaments/`, { headers: this.getHeaders() });
  }

  createTournament(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}tournaments/`, data, { headers: this.getHeaders() });
  }

  finishTournament(tournamentId: number, winnerId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}tournaments/${tournamentId}/finish/`, {
      winner_id: winnerId
    }, { headers: this.getHeaders() });
  }

  deleteTournament(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}tournaments/${id}/`, { headers: this.getHeaders() });
  }
}