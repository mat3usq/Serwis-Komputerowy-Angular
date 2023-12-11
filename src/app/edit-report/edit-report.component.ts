import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../../services/reports.service';
import { Report } from '../../models/Report';
import { Status } from '../../models/Status';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LogService } from 'src/services/logs.service';
import { Log } from 'src/models/Log';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class EditReportComponent implements OnInit {
  public report?: Report;
  public editedStatus: Status = Status.new;
  public editedPrice?: number;
  public statusOptions: Status[] = [
    Status.new,
    Status.assigned,
    Status.inRealization,
    Status.solved,
  ];
  public passedid!: number;
  constructor(
    private reportService: ReportsService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private logService: LogService
  ) { }

  ngOnInit() {
    const id = this.actRoute.snapshot.paramMap.get('id');

    if (id !== null) {
      this.reportService.getReportById(parseInt(id)).subscribe({
        next: (r) => {
          this.report = r;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.error('There is no report id.');
    }
  }


  saveChanges(editedStatus: Status, editedPrice?: number) {
    debugger;
    if (this.report != undefined && editedPrice != undefined) {
      this.report['status'] = editedStatus;
      this.report['price'] = editedPrice;
      this.reportService.updateReport(this.report);
    }

    this.router.navigate(['/reports']);

    if (this.report != undefined) {
      if (editedPrice)
        this.logService.addLog(
          new Log(
            0,
            this.report['id'],
            editedStatus,
            editedPrice,
            new Date()
          )
        );
    }
  }
}
