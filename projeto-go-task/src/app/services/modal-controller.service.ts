import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import { TaskFormModalComponent } from '../components/task-form-modal/task-form-modal.component';
import { ITaskFormControls } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ModalControllerService {
  private readonly modalSizeOptions = {
    maxWidth: '620px',
    width: '95%',
  };

  private readonly _dialog = inject(Dialog);

  openNewTaskModal() {
    return this._dialog.open<ITaskFormControls>(TaskFormModalComponent, {
      ...this.modalSizeOptions,
      disableClose: true,
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
    return this._dialog.open<ITaskFormControls>(TaskFormModalComponent, {
      ...this.modalSizeOptions,
      disableClose: true,
      data: {
        mode: 'edit',
        formValues,
      },
    });
  }
}
