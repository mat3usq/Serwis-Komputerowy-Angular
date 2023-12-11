import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/models/Client';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Z][a-z]*$/)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Z][a-z]*$/)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]]
    });
  }

  submitForm() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      this.userService.doesEmailExist(formData.email)
        .subscribe({
          next: (result) => {
            console.log(result)
            if (!result) {
              const newClient = new Client(0, formData.firstName, formData.lastName, formData.email, formData.password, formData.phoneNumber);
              this.userService.addClient(newClient);
              this.router.navigate(['']);
            } else {
              console.log("Email already exists!");
            }
          },
          error: (err) => {
            console.log(err);
          }
        });
    } else {
      console.log("Form is not valid!!!");
      this.getFormValidationErrors();
    }
  }


  getFormValidationErrors() {
    Object.keys(this.registrationForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.registrationForm.get(key)!.errors!;
      Object.keys(controlErrors || {}).forEach(keyError => {
        console.log(`Key control: ${key}, keyError: ${keyError}, errValue: ${controlErrors[keyError]}`);
      });
    });
  }
}

