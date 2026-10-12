import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IComment, Itask } from '../../interfaces/task.interface';
import { generateUniqueIdWithTimestamp } from '../../utils/generate-unique-id-with-timestamp';

@Component({
  selector: 'app-task-comments-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-comments-modal.component.html',
  styleUrl: './task-comments-modal.component.css',
})
export class TaskCommentsModalComponent {
  readonly _task: Itask = inject(DIALOG_DATA);

  readonly _dialogRef: DialogRef<boolean> = inject(DialogRef);

  hasComments = false;

  commentsControl = new FormControl('', [Validators.required]);

  @ViewChild('commentInput') commentInputRef!: ElementRef<HTMLInputElement>;

  onAddComment() {
    const newComment: IComment = {
      id: generateUniqueIdWithTimestamp(),
      description: this.commentsControl.value ? this.commentsControl.value : '',
    };

    this._task.comments.unshift(newComment);

    this.commentsControl.reset();

    this.hasComments = true;

    this.commentInputRef.nativeElement.focus();
  }

  onRemoveComment(commentId: string) {
    this._task.comments = this._task.comments.filter((comment) => {
      commentId !== commentId;
    });

    this.hasComments = true;
  }

  onCloseModal() {
    this._dialogRef.close(this.hasComments);
  }
}
