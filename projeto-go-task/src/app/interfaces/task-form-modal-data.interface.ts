import { ITaskFormControls } from './task-form-controls.interface';

export interface ITaskFormaModalData {
  mode: 'create' | 'edit';
  formValues: ITaskFormControls;
}
