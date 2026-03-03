import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // Для *ngIf и *ngFor (в новом синтаксисе @if, @for)
import { RouterModule } from '@angular/router';
import { Album } from '../../models/album.model';
import { AlbumService } from '../../services/album';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './albums.html',
  styleUrl: './albums.css'
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  isLoading = true;

  constructor(private albumService: AlbumService,
  private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchAlbums();
    this.cdr.detectChanges();
  }
  

  fetchAlbums(): void {
    this.albumService.getAlbums().subscribe((data) => {
      this.albums = data;
      this.isLoading = false;
    });
  }

  deleteAlbum(id: number): void {
    this.albums = this.albums.filter(a => a.id !== id);
    this.albumService.deleteAlbum(id).subscribe();
  }
}