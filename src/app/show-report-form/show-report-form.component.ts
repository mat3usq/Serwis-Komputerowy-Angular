import { Component } from '@angular/core';
import { Report } from "../../models/Report";
import { Priority } from 'src/models/Priority';
import { Status } from 'src/models/Status';
import { ReportsService } from 'src/services/reports.service';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { NgForm,FormBuilder, Validators, ValidationErrors, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-show-report-form',
  templateUrl: './show-report-form.component.html',
  styleUrls: ['./show-report-form.component.css']
})
export class ShowReportFormComponent {
  problemDescription: string = '';
  selectedPriority: Priority = Priority.normal;
  public newReport: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder, private reportsService: ReportsService,private userService: UserService, private router: Router) { }

  priorityOptions: Priority[] = [
    Priority.high,
    Priority.normal,
  ];

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.newReport = this.formBuilder.group({
      problemDescription: ['', [Validators.minLength(50), Validators.required]],
      priority: ['', Validators.required],
      });
  }

  onSubmit() {
    if (this.newReport.valid) {
      const formData = this.newReport.value;
      const newReport = new Report(formData.problemDescription,formData.priority, Status.new, new Date(), this.userService.getLoggedClient());
      this.addNewReport(newReport)
    } else {
      console.log("Form is not valid!!!");
      this.getFormValidationErrors();
    }
  }

  getFormValidationErrors() {
    Object.keys(this.newReport.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.newReport.get(key)!.errors!;
      Object.keys(controlErrors || {}).forEach(keyError => {
        console.log(`Key control: ${key}, keyError: ${keyError}, errValue: ${controlErrors[keyError]}`);
      });
    });
  }


  addNewReport(newReport: Report) {
    this.reportsService.addReport(newReport);
    this.router.navigate(['/reports']);
  }
}
