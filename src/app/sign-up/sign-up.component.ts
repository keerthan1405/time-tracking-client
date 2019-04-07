import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IHTTPClientModel } from '../models/IHTTPClientModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  postSignUpForm: FormGroup;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.postSignUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      re_enter_password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  postSignUpFormData = () => {
    const formModel = this.postSignUpForm.value;
    this.httpClient.post<IHTTPClientModel>('http://localhost:3000/signup', formModel)
      .subscribe(
        data => {
          if (!data.error) {
            this.postSignUpForm.reset();
            this.router.navigate(['']);
          } else {
            alert('Failed');
          }
        },
        error => {
          console.log(error);
        }
      );
  }
}
