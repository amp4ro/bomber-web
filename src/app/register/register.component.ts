import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: string = "";
  registrationForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl('')
  });
  constructor(private appService : AppService,  private eventsService : EventsService, private router : Router) { }

  ngOnInit(): void {
  }
  registrationSubmit() : void {
    this.appService.register(this.registrationForm.value)
    .subscribe((token) => {
      localStorage.setItem("accesstoken", String(token));
      this.appService.getProfile().subscribe((profile) => {
        this.eventsService.authEmitter.emit(profile);
        this.router.navigate(['/profile']);
      }, (error)=> console.error(error));
    }, (error) => {this.error = error.error.text;})

  }
}
