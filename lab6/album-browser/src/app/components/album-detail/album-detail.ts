import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { Album } from '../../models/album.model';
import { AlbumService } from '../../services/album';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './album-detail.html',
  styleUrl: './album-detail.css'
})
export class AlbumDetailComponent implements OnInit {
  album!: Album;
  loading = true;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,        
    private albumService: AlbumService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.albumService.getAlbum(id).subscribe((data) => {
      this.album = data;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  saveTitle(): void {
    this.albumService.updateAlbum(this.album).subscribe(() => {
      alert('Title updated successfully!');
    });
  }

  goBack(): void {
    this.router.navigate(['/albums']);
}
}