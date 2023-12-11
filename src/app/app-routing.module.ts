import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TestComponent } from './test/test.component';
import { ShowReportsComponent } from './show-reports/show-reports.component';
import { ShowReportFormComponent } from './show-report-form/show-report-form.component';
import { EditReportComponent } from './edit-report/edit-report.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowLogsComponent } from './show-logs/show-logs.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'dashboard', component: TestComponent },
  { path: 'reports', component: ShowReportsComponent },
  { path: 'reportform', component: ShowReportFormComponent },
  { path: 'edit-report/:id', component: EditReportComponent },
  { path: 'showlogs', component: ShowLogsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
