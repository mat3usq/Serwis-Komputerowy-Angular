import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../../services/reports.service';
import { Report } from '../../models/Report';
import { Status } from '../../models/Status';
import { FormGroup, NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LogService } from 'src/services/logs.service';
import { DiscountService } from 'src/services/discount.service';
import { Log } from 'src/models/Log';
import { NgForm, FormBuilder, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
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
  public passedid!: number;
  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportsService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private logService: LogService,
    private discountService: DiscountService
  ) { }

  ngOnInit() {
    this.initForm();
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
  initForm() {
    this.editReport = this.formBuilder.group({
      editedStatus: ['', Validators.required],
      editedPrice: ['', [Validators.min(0), Validators.max(10000), Validators.required]]
    });
  }

  submitForm() {
    if (this.editReport.valid) {
      const formData = this.editReport.value;
      const newPrice = this.discountService.discountDue(this.report!, formData.editedStatus, formData.editedPrice);
      this.saveChanges(formData.editedStatus, newPrice);
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

  saveChanges(editedStatus: Status, editedPrice?: number) {
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
