import { Component, inject } from '@angular/core';
import { ProductService } from './services/product';
import { ProductListComponent } from './components/product-list/product-list'; 
import { Product } from './models/product.model'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  private productService = inject(ProductService);
  
  categories = this.productService.getCategories();
  selectedCategoryId: number | null = null;
  
  filteredProducts: Product[] = []; 

  selectCategory(id: number) {
    this.selectedCategoryId = id;
    this.filteredProducts = this.productService.getProductsByCategory(id);
  }
  removeProduct(id: number) {
  this.filteredProducts = this.filteredProducts.filter(p => p.id !== id);
}
}