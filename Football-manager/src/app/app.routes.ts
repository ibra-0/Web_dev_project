import { Routes } from '@angular/router';

import { ClubsComponent } from './pages/clubs/clubs';
import { PlayersComponent } from './pages/players/players';
import { TransfersComponent } from './pages/transfers/transfers';
import { MatchesComponent } from './pages/matches/matches';
import { TournamentsComponent } from './pages/tournaments/tournaments';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { SquadComponent } from './pages/squad/squad';

export const routes: Routes = [

  { path: '', redirectTo: 'clubs', pathMatch: 'full' },

  { path: 'clubs', component: ClubsComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'transfers', component: TransfersComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'tournaments', component: TournamentsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'squad/:id', component: SquadComponent }

];