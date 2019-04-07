import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IHTTPClientModel } from '../models/IHTTPClientModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  postLoginForm: FormGroup;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.postLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }
  postLoginFormData = () => {
    const formModel = this.postLoginForm.value;
    this.httpClient.post<IHTTPClientModel>('http://localhost:3000/login', formModel)
      .subscribe(
        data => {
          if (!data.error) {
            this.postLoginForm.reset();
            this.router.navigate(['timerpage', {user_id: data.result.rows[0].id} ]);
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
