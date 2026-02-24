import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent implements OnInit {
  // 1. Input fields (Данные от родителя)
  @Input() title: string = 'User';
  @Input() id: number = 0;

  // 4. Parent communication (Событие для родителя)
  @Output() notify = new EventEmitter<string>();

  // 3. Lifecycle hook
  ngOnInit(): void {
    console.log(`Карточка #${this.id} успешно создана!`);
  }

  // 2. Click event
  onBtnClick() {
    this.notify.emit(`Клик по карточке: ${this.title}`);
  }
}