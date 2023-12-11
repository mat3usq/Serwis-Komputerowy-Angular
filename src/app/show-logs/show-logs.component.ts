import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Log } from 'src/models/Log';
import { LogService } from 'src/services/logs.service';
import { DisplayLogsComponent } from '../display-logs/display-logs.component';
import { UserService } from 'src/services/user.service';
import { ReportsService } from 'src/services/reports.service';
import { Report } from 'src/models/Report';
@Component({
  selector: 'app-show-logs',
  standalone: true,
  imports: [CommonModule, DisplayLogsComponent],
  templateUrl: './show-logs.component.html',
  styleUrl: './show-logs.component.css',
})
export class ShowLogsComponent implements OnInit {
  logs: Log[] = [];
  public isServiceman: boolean = false;
  public loggedUserId: number = -1;

  constructor(private reportService: ReportsService, private userService: UserService, private logService: LogService) { }

  ngOnInit(): void {
    this.getLogData();
  }

  getLogData() {
    this.isServiceman = this.userService.isServiceman();
    this.loggedUserId = this.userService.getLoggedUserId();
    
    let reports: Report[]=[];
    
    this.logService.getLogs().subscribe({
      next: (r) => { this.logs = r 
        this.reportService.getReportsByUserId(this.loggedUserId).subscribe({
          next: (reports) => {reports = reports
            if(this.isServiceman == false){
              this.logs = this.logService.getLogsForUser(this.logs,reports,this.loggedUserId);
              console.log(this.logs);
            } },
          error: (err) => { console.log(err) }
        });
      
      },
      error: (err) => { console.log(err) }
    });    
  }

  deleteLog(logId: number) {
    this.logService.deleteLog(logId);
  }
}
