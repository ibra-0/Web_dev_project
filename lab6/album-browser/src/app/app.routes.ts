import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { AboutComponent } from './components/about/about';
import { AlbumsComponent } from './components/albums/albums';
import { AlbumDetailComponent } from './components/album-detail/album-detail';
import { AlbumPhotosComponent } from './components/album-photos/album-photos';

export const routes: Routes = [
  // 1. Редирект с пустого пути на home
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  
  // 2. Главная страница
  { path: 'home', component: HomeComponent },
  
  // 3. Страница "О нас"
  { path: 'about', component: AboutComponent },
  
  // 4. СПИСОК ВСЕХ АЛЬБОМОВ (у тебя этого не было!)
  { path: 'albums', component: AlbumsComponent },
  
  // 5. ДЕТАЛИ АЛЬБОМА (и этого тоже!)
  { path: 'albums/:id', component: AlbumDetailComponent },
  
  // 6. ФОТОГРАФИИ АЛЬБОМА
  { path: 'albums/:id/photos', component: AlbumPhotosComponent }, 
];