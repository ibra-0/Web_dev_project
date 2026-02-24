import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  @Input() product!: Product;
  @Output() favoriteToggle = new EventEmitter<void>();

  currentImageIndex = 0;

  onToggleFavorite() {
    this.favoriteToggle.emit();
  }

  changeImage(index: number) {
    this.currentImageIndex = index;
  }

  shareWhatsApp() {
    const message = `Посмотри, какой товар я нашел: ${this.product.link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  }

  shareTelegram() {
    const url = `https://t.me/share/url?url=${encodeURIComponent(this.product.link)}&text=${encodeURIComponent(this.product.name)}`;
    window.open(url, '_blank');
  }
}