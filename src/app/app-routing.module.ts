import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TestComponent } from './test/test.component';
//import { ShowReportsComponent } from './show-reports/show-reports.component';
//import { ShowReportFormComponent} from "./show-report-form/show-report-form.component";
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'dashboard', component: TestComponent },
  //{ path: 'reports', component: ShowReportsComponent },
  //{ path: 'reportForm', component: ShowReportFormComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
