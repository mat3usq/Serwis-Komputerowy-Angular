import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Log } from 'src/models/Log';
import { LogService } from 'src/services/logs.service';
import { DisplayLogsComponent } from '../display-logs/display-logs.component';

@Component({
  selector: 'app-show-logs',
  standalone: true,
  imports: [CommonModule, DisplayLogsComponent],
  templateUrl: './show-logs.component.html',
  styleUrl: './show-logs.component.css',
})
export class ShowLogsComponent implements OnInit {
  logs: Log[] = [];

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.getLogData();
  }

  getLogData() {
    this.logService.getLogs().subscribe({
      next: (r) => { this.logs = r },
      error: (err) => { console.log(err) }
    });
  }

  deleteLog(logId: number) {
    this.logService.deleteLog(logId);
  }
}
