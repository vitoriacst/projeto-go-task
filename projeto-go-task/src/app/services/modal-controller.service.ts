import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import {
  TaskCommentsModalComponent,
  TaskFormModalComponent,
} from '../components';
import { ITaskFormControls } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ModalControllerService {
  private readonly _dialog = inject(Dialog);

  private readonly modalSizeOptions = {
    maxWidth: '620px',
    width: '95px',
  };

  openNewTaskModal() {
    return this._dialog.open(TaskFormModalComponent, {
      ...this.modalSizeOptions,
      data: {
        mode: 'create',
        formValues: {
          name: '',
          description: '',
        },
      },
    });
  }

  openEditTaskModal(formValues: ITaskFormControls) {
    return this._dialog.open(TaskFormModalComponent, {
      ...this.modalSizeOptions,
      data: {
        mode: 'edit',
        formValues,
      },
    });
  }

  openTaskCommentsModal() {
    return this._dialog.open(TaskCommentsModalComponent, {
      ...this.modalSizeOptions,
      data: {
        mode: 'edit',
      },
    });
  }
}
