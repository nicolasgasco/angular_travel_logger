import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'travel-log-journal-expansion',
  template: ` <mat-expansion-panel
    (opened)="panelOpenState = true"
    (closed)="panelOpenState = false"
  >
    <mat-expansion-panel-header>
      <mat-panel-title>Journal</mat-panel-title>
      <mat-panel-description>
        {{ entries.length }} {{ entries.length === 1 ? 'entry' : 'entries' }}
      </mat-panel-description>
    </mat-expansion-panel-header>
    <mat-list role="list">
      <mat-list-item role="listitem" *ngFor="let journalEntry of entries; let i = index">
        <p>
          <span class="journal-date-label">
            {{
              journalEntry.day.toDate().toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long'
              })
            }}</span
          >: {{ journalEntry.entry }}
        </p>
        <mat-divider *ngIf="entries.length > 1 && i !== (entries.length - 1)"></mat-divider>
      </mat-list-item>
    </mat-list>
  </mat-expansion-panel>`,
  styleUrls: ['./journal-expansion.component.scss'],
})
export class JournalExpansionComponent implements OnInit {
  @Input() entries: {}[];

  constructor() {}

  panelOpenState = false;

  ngOnInit(): void {}
}
