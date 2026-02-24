import { Component, signal } from '@angular/core'; // добавим signal для красоты
import { UserCardComponent } from './user-card/user-card.component'; // твой новый компонент

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserCardComponent], // ОБЯЗАТЕЛЬНО добавь сюда
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = signal('minitask'); // в новых версиях Angular это часто сигнал
  message = '';

  // Метод для обработки события из карточки
  handleNotify(event: string) {
    this.message = event;
    console.log('Уведомление от дочернего компонента:', event);
  }
}