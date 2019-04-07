import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IHTTPClientModel } from '../models/IHTTPClientModel';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConstants } from '../app.constants';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  from: string;
  to: Date;
  // tslint:disable-next-line:variable-name
  user_id: any;
  items: any;
  searchData: string;
  getSearchDataContent: boolean;
  getAllDataContent: boolean;
  date1: any;
  date2: any;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.getAllDataContent = true;
    // this.getSearchDataContent = false;
    this.user_id = this.activatedRoute.snapshot.params.user_id;
    this.getTimerData();
    // this.from = '';
    // this.to = '';
  }

  getTimerData = () => {
    console.log(this.date1, this.date2);
    if (this.date1) {
      this.from = this.date1;
    } else {
      this.from = '1970-01-01';
    }
    if (this.to) {
      this.to = this.date2;
    } else {
      this.to = new Date();
    }
    console.log(this.user_id, this.from, this.to);
    this.httpClient.get<IHTTPClientModel>(AppConstants.API_URL + 'timer/' + this.user_id + '/' + this.from + '/' + this.to)
      .subscribe(
        data => {
          if (!data.error) {
            console.log(data.result);
            this.items = data.result;
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteTimer = (id) => {
    this.httpClient.delete<IHTTPClientModel>(AppConstants.API_URL + 'timer/' + this.user_id + '/' + id)
      .subscribe(
        data => {
          if (!data.error) {
            this.getTimerData();
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  getSearchdata = () => {
    this.httpClient.get<IHTTPClientModel>(AppConstants.API_URL + 'timer/' + this.user_id + '/' + this.searchData)
      .subscribe(
        data => {
          if (!data.error) {
            // this.getAllDataContent = false;
            // this.getSearchDataContent = true;
            console.log(data.result);
            this.items = '';
            this.items = data.result;
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  example = () => {
    // console.log(this.data1, this.toDate);
  }

}
