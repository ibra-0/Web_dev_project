import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Photo } from '../../models/photo.model';
import { AlbumService } from '../../services/album';

@Component({
  selector: 'app-album-photos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './album-photos.html',
  styleUrl: './album-photos.css'
})
export class AlbumPhotosComponent implements OnInit {
  photos: Photo[] = [];
  albumId!: number;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.albumId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.albumService.getAlbumPhotos(this.albumId).subscribe(data => {
      this.photos = data;
      this.loading = false;
    });
  }
}