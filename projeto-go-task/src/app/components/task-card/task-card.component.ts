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
  private readonly _modalControllerService = inject(ModalControllerService);

  private readonly _taksServie = inject(TaskService);

  @Input({ required: true }) task!: Itask;

  openEditTaskModal() {
    const dialogRef = this._modalControllerService.openEditTaskModal({
      name: this.task.name,
      description: this.task.description,
    });
    dialogRef.closed.subscribe((taskform) => {
      if (taskform) {
        this._taksServie.updateTaskData(
          this.task.id,
          this.task.status,
          taskform.name,
          taskform.description,
        );
      }
    });
  }
}
