import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'travel-log-card-actions',
  template: `
    <button mat-icon-button aria-label="Edit trip">
      <mat-icon id="edit-icon">mode_edit</mat-icon>
    </button>
    <button
      color="warn"
      mat-icon-button
      aria-label="Delete trip"
      (click)="onClickDelete()"
    >
      <mat-icon>delete</mat-icon>
    </button>
  `,
  styleUrls: ['./card-actions.component.scss'],
})
export class CardActionsComponent {
  @Output() deleteTrip = new EventEmitter<void>();
  constructor(public dialog: MatDialog) {}

  onClickDelete() {
    const dialogRef = this.dialog.open(DeleteCardModalComponent);
    dialogRef.afterClosed().subscribe((confirmDelete) => {
      if (confirmDelete) {
        this.deleteTrip.emit();
      }
    });
  }
}

@Component({
  selector: 'travel-log-delete-dialog',
  template: `<h1>Do you really want to delete this trip?</h1>
    <div id="delete-card-modal-content" mat-dialog-content mat-dialog-title>
      <p fxLayout="row" fxLayoutAlign="start center">
        <mat-icon>warning</mat-icon>This action cannot be undone.
      </p>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="true">
        Ok
      </button>
    </div>`,
  styleUrls: ['./card-actions.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DeleteCardModalComponent {}
