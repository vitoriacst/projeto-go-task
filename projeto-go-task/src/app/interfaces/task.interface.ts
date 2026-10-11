import { taskStatus } from '../types/task.status';

export interface IComment {
  id: string;
  description: string;
}

export interface Itask {
  id: string;
  name: string;
  description: string;
  comments: IComment[];
  status: taskStatus;
}
