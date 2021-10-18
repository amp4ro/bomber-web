import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string = "";
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private appService : AppService, private eventsService : EventsService, private router : Router) { }

  ngOnInit(): void {
  }
  loginSubmit() : void {
    this.appService.login(this.loginForm.value)
    .subscribe((token) => {
      localStorage.setItem("accesstoken", String(token));
      this.appService.getProfile().subscribe((profile) => {
        this.eventsService.authEmitter.emit(profile);
        this.router.navigate(['/profile']);
      }, (error)=> console.error(error));
    }, (error) => {console.error(error); this.error = error.error.text;})
  }
}
