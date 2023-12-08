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

  async getLogData() {
    const logsObservable = await this.logService.getLogs();
    logsObservable.subscribe(logs => {
      this.logs = logs;
    });
  }

  deleteLog(logId: number) {
    this.logService.deleteLog(logId);
  }
}
