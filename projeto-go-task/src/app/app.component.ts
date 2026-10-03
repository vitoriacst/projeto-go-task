import { Component } from '@angular/core';
import {
  HeaderComponent,
  MainContentComponent,
  TaskFormModalComponent,
} from './components';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MainContentComponent, TaskFormModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'projeto-go-task';
}
