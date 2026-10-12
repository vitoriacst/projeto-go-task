import { Component, inject, Input } from '@angular/core';
import { Itask } from '../../interfaces/task.interface';
import { ModalControllerService } from '../../services/modal-controller.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Itask;

  private readonly _modalControllerService = inject(ModalControllerService);

  private readonly _taskServie = inject(TaskService);

  oenEditTaskModal() {
    const dialogRef = this._modalControllerService.openEditTaskModal({
      name: this.task.name,
      description: this.task.description,
    });
    dialogRef.closed.subscribe((taskform) => {
      if (taskform) {
        this._taskServie.updateTaskData(
          this.task.id,
          this.task.status,
          taskform.name,
          taskform.description,
        );
      }
    });
  }

  openTaskCommentsModal() {
    const dialogRef = this._modalControllerService.openTaskCommentsModal(
      this.task,
    );
    dialogRef.closed.subscribe((taskCommentsChanged) => {
      if (taskCommentsChanged) {
        this._taskServie.updateTaskComments(
          this.task.id,
          this.task.status,
          this.task.comments,
        );
      }
    });
  }

  deleteTask() {
    this._taskServie.deleteTask(this.task.id, this.task.status);
  }
}
