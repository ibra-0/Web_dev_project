import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css'
})
export class ProductItem { 
  @Input() product!: Product; 
  @Output() remove = new EventEmitter<number>(); 

  removeMe() {
    this.remove.emit(this.product.id);
  }
  get statusClass() {
    if (this.product.likes >= 10) return 'super-popular';
    if (this.product.likes >= 5) return 'popular';
    return '';
  }
}