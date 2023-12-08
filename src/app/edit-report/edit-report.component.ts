import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../../services/reports.service';
import { Report } from '../../models/Report';
import { Status } from '../../models/Status';
import { FormGroup, MinValidator, NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LogService } from 'src/services/logs.service';
import { Log } from 'src/models/Log';
import { NgForm,FormBuilder, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css'],
})
export class EditReportComponent implements OnInit {
  public report?: Report;
  public editedStatus: Status = Status.new; 
  public editedPrice?: number;

  public editReport: FormGroup = new FormGroup({});
  public statusOptions: Status[] = [
    Status.new,
    Status.assigned,
    Status.inRealization,
    Status.solved,
  ];
  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportsService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private logService: LogService
  ) {}
  ngOnInit() {
    this.initForm();
    const id = this.actRoute.snapshot.paramMap.get('reportId');
    if (id != undefined) {
      this.report = this.reportService.getReportById(parseInt(id));
    }
  }
  initForm() {
    this.editReport = this.formBuilder.group({
      editedStatus: ['', Validators.required],
      editedPrice: ['', [Validators.min(0),Validators.max(10000), Validators.required]]
    });
  }

  submitForm(){
    if (this.editReport.valid) {
      const formData = this.editReport.value;
      this.saveChanges(formData.editedStatus,formData.editedPrice);
    } else {
      console.log("Form is not valid!!!");
      this.getFormValidationErrors();
    }
    }

  getFormValidationErrors() {
    Object.keys(this.editReport.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.editReport.get(key)!.errors!;
      Object.keys(controlErrors || {}).forEach(keyError => {
        console.log(`Key control: ${key}, keyError: ${keyError}, errValue: ${controlErrors[keyError]}`);
      });
    });
  }

  async saveChanges(editedStatus: Status, editedPrice?: number) {
    let generatedId: number = 0;

    if (this.report != undefined && editedPrice != undefined)
      this.reportService.editReport(
        this.report['reportId'],
        editedStatus,
        editedPrice
      );
    this.router.navigate(['/reports']);

    const logsObservable = await this.logService.getLogs();
    logsObservable.subscribe((logs) => {
      logs.forEach((log) => {
        if (log['id'] > generatedId) generatedId = log['id'];
      });
    });

    if (this.report != undefined) {
      const price = this.report['price'];
      if (editedPrice)
        this.logService.addLog(
          new Log(
            generatedId + 1,
            this.report['reportId'],
            editedStatus,
            editedPrice,
            new Date()
          )
        );
    }
  }
}
