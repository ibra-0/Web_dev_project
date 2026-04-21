import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { ClubsComponent } from './pages/clubs/clubs';
import { PlayersComponent } from './pages/players/players';
import { TransfersComponent } from './pages/transfers/transfers';
import { MatchesComponent } from './pages/matches/matches';
import { TournamentsComponent } from './pages/tournaments/tournaments';
import { SignupComponent } from './pages/signup/signup';
// ... твои текущие импорты

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'clubs', component: ClubsComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'transfers', component: TransfersComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'tournaments', component: TournamentsComponent },

  // ИСПРАВЛЕННЫЕ СТРОКИ: Направляем всех на ClubsComponent, 
  // но в самом компоненте будем проверять роль
  { path: 'user-view', component: ClubsComponent }, 
  { path: 'manager-view', component: ClubsComponent },
  { path: 'admin-dashboard', component: ClubsComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }