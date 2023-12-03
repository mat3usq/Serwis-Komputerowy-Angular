import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Log } from 'src/models/Log';
import { LogService } from 'src/services/logs.service';

@Component({
  selector: 'app-show-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-logs.component.html',
  styleUrl: './show-logs.component.css'
})
export class ShowLogsComponent implements OnInit {
  logs: Log[] = [];

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.getLogData();
    console.log(this.logs)
  }

  getLogData() {
    this.logService.getLogs().subscribe(
      {
       next: (data) => this.logs = data,
       error: (err) => { console.log(err) },
      }
   )
  }
  

}
