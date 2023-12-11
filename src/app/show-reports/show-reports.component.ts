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
  public priority: 'normal' | 'high' | 'all' = 'all';
  public startDate!: Date;
  public endDate!: Date;

  statusOptions: Status[] = [
    Status.new,
    Status.assigned,
    Status.inRealization,
    Status.solved,
  ];

  constructor(private reportsService: ReportsService, private userService: UserService, private router: Router) {
    this.reportsService.getStartDate().subscribe({
      next: (r) => { this.startDate = r },
      error: (err) => { console.log(err) }
    });
    this.reportsService.getEndDate().subscribe({
      next: (r) => { this.endDate = r },
      error: (err) => { console.log(err) }
    });
  }

  ngOnInit(): void {
    this.loadReports();
  }

  changeDateOrder(datesOrder: 'asc' | 'desc') {
    this.datesOrder = datesOrder;
  }

  changePriorityOrder(priority: 'normal' | 'high' | 'all') {
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
    this.loggedUserId = this.userService.getLoggedUserId();
    if (this.isServiceman) {
      this.reportsService.getReports().subscribe({
        next: (reports) => { this.reports = reports },
        error: (err) => { console.log(err) }
      });
    }
    else
      this.reportsService.getReportsByUserId(this.userService.getLoggedUserId()).subscribe({
        next: (reports) => { this.reports = reports },
        error: (err) => { console.log(err) }
      });
  }

  NavigateToEditReport(id: number) {
    this.router.navigate(['/edit-report', id]);
  }

  TakeTask(clickedReport: Report) {
    this.reportsService.assignServicemanToReport(clickedReport['id'], this.userService.getLoggedUserId());
  }
}
