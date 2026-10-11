import { Component, inject } from '@angular/core';
import { ModalControllerService } from '../../services/modal-controller.service';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  private readonly _modalControllerService = inject(ModalControllerService);

  openEditTaskModal() {
    const dialogRef = this._modalControllerService.openNewTaskModal();
    dialogRef.closed.subscribe((taskform) => {
      console.log('tarefa alterada', taskform);
    });
  }
}
