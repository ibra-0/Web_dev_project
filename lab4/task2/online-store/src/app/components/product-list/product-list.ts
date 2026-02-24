import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductItem } from '../product-item/product-item'; 

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItem],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent { 
  @Input() products: Product[] = [];
  removeItem(productId: number) {
  this.products = this.products.filter(item => item.id !== productId);
}
  @Output() removeProductEvent = new EventEmitter<number>();
  onItemRemove(id: number) {
    this.removeProductEvent.emit(id); // Пробрасываем ID выше в AppComponent
  }
}