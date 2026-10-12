import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { TaskStatusEnum } from '../enums';
import { ITaskFormControls } from '../interfaces';
import { IComment, Itask } from '../interfaces/task.interface';
import { taskStatus } from '../types/task.status';
import { generateUniqueIdWithTimestamp } from '../utils/generate-unique-id-with-timestamp';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private todoTask$ = new BehaviorSubject<Itask[]>(
    this.loadTasksOnLocalStorage(TaskStatusEnum.TODO),
  );
  private doneTask$ = new BehaviorSubject<Itask[]>(
    this.loadTasksOnLocalStorage(TaskStatusEnum.DOING),
  );
  private doingTask$ = new BehaviorSubject<Itask[]>(
    this.loadTasksOnLocalStorage(TaskStatusEnum.DONE),
  );

  readonly todoTasks = this.todoTask$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap((tasks) => this.saveTasksOnLocalStorage(TaskStatusEnum.TODO, tasks)),
  );

  readonly doingTasks = this.doingTask$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap((tasks) => this.saveTasksOnLocalStorage(TaskStatusEnum.DOING, tasks)),
  );
  readonly doneTasks = this.doneTask$
    .asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));

  addTask(taskInfos: ITaskFormControls) {
    const newTask: Itask = {
      ...taskInfos,
      status: TaskStatusEnum.TODO,
      id: generateUniqueIdWithTimestamp(),
      comments: [],
    };

    this.todoTask$.next([...this.todoTask$.value, newTask]);
  }

  updateTaskData(
    taskId: string,
    taskStatus: taskStatus,
    newTaskName: string,
    newTaskDescription: string,
  ) {
    const currentTaskList = this.getTaskListByStatus(taskStatus);

    const currentTaskIndex = currentTaskList.value.findIndex(
      (task) => task.id === taskId,
    );

    if (currentTaskIndex > -1) {
      const updateTaskList = [...currentTaskList.value];

      updateTaskList[currentTaskIndex] = {
        ...updateTaskList[currentTaskIndex],
        name: newTaskName,
        description: newTaskDescription,
      };

      currentTaskList.next(updateTaskList);
    }
  }

  updateTaskComments(
    taskId: string,
    taskStatus: taskStatus,
    newTaskComments: IComment[],
  ) {
    const currentTaskList = this.getTaskListByStatus(taskStatus);
    const currentTaskIndex = currentTaskList.value.findIndex(
      (task) => task.id === taskId,
    );
    if (currentTaskIndex > -1) {
      const updateTaskList = [...currentTaskList.value];

      updateTaskList[currentTaskIndex] = {
        ...updateTaskList[currentTaskIndex],
        comments: [...newTaskComments],
      };

      currentTaskList.next(updateTaskList);
    }
  }

  updateTaskStatus(
    taskId: string,
    taskCurrentStatus: taskStatus,
    taskNextStatus: taskStatus,
  ) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);
    const nextTaskList = this.getTaskListByStatus(taskNextStatus);
    const currentTask = currentTaskList.value.find(
      (task) => task.id === taskId,
    );

    if (currentTask) {
      currentTask.status = taskNextStatus;
      const currentTaskListWithoutTask = currentTaskList.value.filter(
        (task) => task.id !== taskId,
      );
      currentTaskList.next([...currentTaskListWithoutTask]);

      nextTaskList.next([...nextTaskList.value, { ...currentTask }]);
    }
  }

  deleteTask(taskId: string, taskCurrentStatus: taskStatus) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);

    const newTaskList = currentTaskList.value.filter((task) => {
      task.id !== taskId;
    });

    currentTaskList.next(newTaskList);
  }

  private saveTasksOnLocalStorage(key: string, tasks: Itask[]) {
    try {
      localStorage.setItem(key, JSON.stringify(tasks));
    } catch (e) {
      console.log('error ao salvar as tarefas', e);
    }
  }

  private loadTasksOnLocalStorage(key: string) {
    try {
      const storageTasks = localStorage.getItem(key);
      return storageTasks ? JSON.parse(storageTasks) : [];
    } catch (e) {
      console.log('error ao pegar as tarefas', e);
    }
  }

  private getTaskListByStatus(taskStatus: taskStatus) {
    const taskListObj = {
      [TaskStatusEnum.TODO]: this.todoTask$,
      [TaskStatusEnum.DOING]: this.doingTask$,
      [TaskStatusEnum.DONE]: this.doneTask$,
    };

    return taskListObj[taskStatus];
  }
}
