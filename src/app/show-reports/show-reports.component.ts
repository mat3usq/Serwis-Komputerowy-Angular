import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { Report } from '../../models/Report';
import { Status } from '../../models/Status';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-reports',
  templateUrl: './show-reports.component.html',
  styleUrls: ['./show-reports.component.css'],
})
export class ShowReportsComponent implements OnInit {
  public reports: Report[] = [];
  public isServiceman: boolean = false;
  public loggedUserId: number = -1;

  public datesOrder: 'asc' | 'desc' = 'asc';
  public priority: 'asc' | 'desc' | 'all' = 'all';
  public startDate: Date = this.reportsService.getStartDate();
  public endDate: Date = this.reportsService.getEndDate();

  statusOptions: Status[] = [
    Status.new,
    Status.assigned,
    Status.inRealization,
    Status.solved,
  ];

  constructor(
    private reportsService: ReportsService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadReports();
  }

  changeDateOrder(datesOrder: 'asc' | 'desc') {
    this.datesOrder = datesOrder;
  }

  changePriorityOrder(priority: 'asc' | 'desc' | 'all') {
    this.priority = priority;
  }

  changeStartDateFilter(newStartDate: Date) {
    this.startDate = newStartDate;
  }

  changeEndDateFilter(newEndDate: Date) {
    this.endDate = newEndDate;
  }

  loadReports() {
    this.isServiceman = this.userService.isServiceman();
    this.loggedUserId = this.userService.getLoggedClient();
    if (this.isServiceman) this.reports = this.reportsService.getReports();
    else
      this.reports = this.reportsService.getReportsByUserId(
        this.userService.getLoggedClient()
      );
    console.log(this.reports);
  }

  NavigateToEditReport(reportId: number) {
    const navigationExtras = {
      state: {
        ReportId: reportId,
      },
    };
    this.router.navigate(['/edit-report', reportId]);
  }

  TakeTask(clickedReport: Report) {
    this.reportsService.assignServicemanToReport(
      clickedReport['reportId'],
      this.userService.getLoggedClient()
    );
    console.log(this.reportsService.getReports());
    window.location.reload();
  }
}
