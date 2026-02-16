import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
})
export class ProductCard {

  @Input() product!: Product;

  currentImageIndex = 0;

  get currentImage(): string {
    if (this.product.images && this.product.images.length > 0) {
      return this.product.images[this.currentImageIndex];
    }
    return this.product.image;
  }

  nextImage() {
    if (!this.product.images || this.product.images.length === 0) return;

    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.product.images.length;
  }

  prevImage() {
    if (!this.product.images || this.product.images.length === 0) return;

    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.product.images.length) %
      this.product.images.length;
  }

  shareWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(this.product.link)}`;
    window.open(url, '_blank');
  }
}
