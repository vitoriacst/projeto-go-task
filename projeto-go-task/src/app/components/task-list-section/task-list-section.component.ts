import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, inject, OnInit } from '@angular/core';
import { Itask } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { TaskCardComponent } from '../task-card';

@Component({
  selector: 'app-task-list-section',
  imports: [TaskCardComponent, CdkDropList, CdkDrag],
  templateUrl: './task-list-section.component.html',
  styleUrl: './task-list-section.component.css',
})
export class TaskListSectionComponent implements OnInit {
  onCardDrop($event: CdkDragDrop<Itask[], any, any>) {
    throw new Error('Method not implemented.');
  }
  todoTasks: Itask[] = [];
  doingTasks: Itask[] = [];
  doneTasks: Itask[] = [];

  private readonly _taskService = inject(TaskService);

  ngOnInit(): void {
    this._taskService.todoTasks.subscribe((tasks) => {
      this.todoTasks = tasks;
    });
    this._taskService.doingTasks.subscribe((tasks) => {
      this.doingTasks = tasks;
    });
    this._taskService.doneTasks.subscribe((tasks) => {
      this.doneTasks = tasks;
    });
  }
}
