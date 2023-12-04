import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Log } from 'src/models/Log';

@Component({
  selector: 'app-display-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-logs.component.html',
  styleUrl: './display-logs.component.css'
})
export class DisplayLogsComponent {
  @Input() logs: Log[];
  @Output() chosenLogId: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.logs = [];
  }

  deleteLog(logId: number) {
    this.chosenLogId.emit(logId);
    window.location.reload();
  }
}
