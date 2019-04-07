import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html',
  styleUrls: ['./timer-page.component.scss']
})
export class TimerPageComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  user_id: any;
  h1: HTMLHeadingElement;
  start: HTMLElement;
  stop: HTMLElement;
  clear: HTMLElement;
  seconds: number;
  minutes: number;
  hours: number;
  t: any;
  showTime: any;
  timerForm: FormGroup;
  isForm: boolean;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.timerForm = this.formBuilder.group({
      timer: ['', Validators.required],
      description: ['', Validators.required],
      user_id: ['']
    });
    this.user_id = this.activatedRoute.snapshot.params.user_id;
    this.h1 = document.getElementsByTagName('h1')[0];
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
  }
  add = () => {
    this.seconds++;
    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++;
      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hours++;
      }
    }
    // tslint:disable-next-line:max-line-length
    this.showTime = (this.hours ? (this.hours > 9 ? this.hours : '0' + this.hours) : '00') + ':' + (this.minutes ? (this.minutes > 9 ? this.minutes : '0' + this.minutes) : '00') + ':' + (this.seconds > 9 ? this.seconds : '0' + this.seconds);
  }
  timer() {
    this.t = setInterval(this.add, 1000);
  }
  /* Stop button */
  stopTimer = () => {
    this.timerForm.controls.timer.setValue(this.showTime);
    this.timerForm.controls.user_id.setValue(this.user_id);
    clearTimeout(this.t);
    this.isForm = true;
  }
  /* Clear button */
  clearTimer = () => {
    this.showTime = this.seconds = 0; this.minutes = 0; this.hours = 0;
  }
  submitTimeForm = () => {
    const formModel = this.timerForm.value;
    this.httpClient.post('http://localhost:3000/timer', formModel)
      .subscribe(
        data => {
          this.isForm = false;
          this.timerForm.reset();
          this.clearTimer();
        }, err => {
          console.log(err);
        }
      );
  }

  timerList = () => {
    this.router.navigate(['/listview', {user_id: this.user_id}]);
  }
}
