import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StringifyOptions } from 'querystring';

@Component({
  selector: 'travel-log-modal',
  template: ``,
})
export class ModalComponent {}

@Component({
  selector: 'travel-log-modal-dialog',
  template: ` <h2 class="h2" mat-dialog-title *ngIf="data.modalTitle">
      {{ data.modalTitle }}
    </h2>
    <mat-dialog-content class="mat-typography">
      <p *ngIf="data.modalText">{{ data.modalText }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button
        mat-stroked-button
        mat-dialog-close
        *ngIf="data.secondaryButtonText"
        color="outline"
        fill="solid"
      >
        {{ data.secondaryButtonText }}
      </button>
      <button
        mat-flat-button
        [mat-dialog-close]="true"
        cdkFocusInitial
        color="accent"
        fill="solid"
      >
        {{ data.mainButtonText || 'Ok' }}
      </button>
    </mat-dialog-actions>`,
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponentDialog implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
