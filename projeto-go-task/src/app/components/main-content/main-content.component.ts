import { Component } from '@angular/core';
import { TaskListSectionComponent } from '../task-list-section';
import { WelcomeSectionComponent } from '../welcome-section';

@Component({
  selector: 'app-main-content',
  imports: [WelcomeSectionComponent, TaskListSectionComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
})
export class MainContentComponent {}
