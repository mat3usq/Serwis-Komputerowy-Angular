import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { Report } from '../../models/Report';
import { Priority } from '../../models/Priority';
import { Status } from '../../models/Status';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-show-reports',
  templateUrl: './show-reports.component.html',
  styleUrls: ['./show-reports.component.css'],
})
export class ShowReportsComponent implements OnInit {
  reports: Report[] = [];

  statusOptions: Status[] = [Status.new, Status.assigned, Status.inRealization, Status.solved];

  constructor(private reportsService: ReportsService,private userService: UserService,) { }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports() {
    if(this.userService.isServiceman()) this.reports = this.reportsService.getReports();
    else this.reports = this.reportsService.getReportsByUserId(this.userService.getLoggedClient());
    console.log(this.reports)
  }



}
