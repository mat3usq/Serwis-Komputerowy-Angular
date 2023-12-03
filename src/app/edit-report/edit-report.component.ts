// edit-report.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../../services/reports.service';
import { Report } from '../../models/Report';
import { Status } from '../../models/Status';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class EditReportComponent implements OnInit {
  public report?: Report;
  public editedStatus: Status = Status.new; // Inicjalizuj zgodnie z Twoimi potrzebami
  public editedPrice?: number; // Inicjalizuj zgodnie z Twoimi potrzebami
  public statusOptions: Status[] = [
    Status.new,
    Status.assigned,
    Status.inRealization,
    Status.solved,
  ];
  constructor(
    private reportService: ReportsService, // Inject CRUD API in constructor
    private actRoute: ActivatedRoute, // Activated route to get the current component's information
    private router: Router
  ) {}
  ngOnInit() {
    const id = this.actRoute.snapshot.paramMap.get('reportId'); // Getting current component's id or information using ActivatedRoute service
    console.log(id);
    if(id != undefined) {
      console.log("111")
      this.report = this.reportService.getReportById(parseInt(id));
      console.log(this.report)
    }
    
  }

  saveChanges(editedStatus: Status, editedPrice?: number ) {
    if(this.report != undefined && editedPrice != undefined) this.reportService.editReport(this.report['reportId'],editedStatus,editedPrice);
    this.router.navigate(['/reports']);
    // Tutaj umieść kod zapisujący zmiany w raporcie
    // Użyj this.report, this.editedStatus, this.editedPrice itp.
  }
}
