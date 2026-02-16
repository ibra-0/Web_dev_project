import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from './components/product-list/product-list';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductList],
  template: '<app-product-list></app-product-list>',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('online-store');
}
