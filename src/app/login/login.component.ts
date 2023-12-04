import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.userService.getClient(formData.email, formData.password)
        .subscribe({
          next: (result) => {
            const loggedClient = result;
            if (loggedClient) {
              this.userService.addLoggedClient(result['id']);
              this.router.navigate(['reports']);
            } else {
            }
          },
          error: (err) => {
            console.error(err);
          }
        });
    } else {
      console.log("Form is not valid!!!");
      this.getFormValidationErrors();
    }
  }

  getFormValidationErrors() {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.loginForm.get(key)!.errors!;
      Object.keys(controlErrors || {}).forEach(keyError => {
        console.log(`Key control: ${key}, keyError: ${keyError}, errValue: ${controlErrors[keyError]}`);
      });
    });
  }
}
