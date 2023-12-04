import { Component } from '@angular/core';
import { Report } from "../../models/Report";
import { Priority } from 'src/models/Priority';
import { Status } from 'src/models/Status';
import { ReportsService } from 'src/services/reports.service';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-report-form',
  templateUrl: './show-report-form.component.html',
  styleUrls: ['./show-report-form.component.css']
})
export class ShowReportFormComponent {
  problemDescription: string = '';
  selectedPriority: Priority = Priority.normal;

  constructor(private reportsService: ReportsService,private userService: UserService, private router: Router) { }

  priorityOptions: Priority[] = [
    Priority.high,
    Priority.normal,
  ];
  onSubmit() {
    console.log('Opis problemu:', this.problemDescription);
    console.log('Priorytet:', this.selectedPriority);
    const newReport = new Report(this.problemDescription, this.selectedPriority, Status.new, new Date(), this.userService.getLoggedClient());
    console.log(newReport);
    this.reportsService.addReport(newReport);
    this.router.navigate(['/reports']);
    console.log(this.userService.getLoggedClient());

  }
}
