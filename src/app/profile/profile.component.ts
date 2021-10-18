import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';
import { DateService } from '../date.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  times: number[] = [1, 3, 5, 10, 20, 30];
  avalibleTimes: number[] = [];
  events : any = [];
  error: string = "";
  profile : any = null;
  activateForm: FormGroup = new FormGroup({
    phone: new FormControl(''),
    minutes: new FormControl('')
  });
  constructor(private appService : AppService, private dateService: DateService) { }

  ngOnInit(): void {
    this.appService.getProfile().subscribe((profile:any) => {
      this.profile = profile;
      console.log(profile);
      this.avalibleTimes = this.times.filter(time => time <= profile.subscribtion.maxBomberTimeMinutes)
    }, (error)=> console.error(error));
    this.appService.activations().subscribe(
      (events: any) => {
        console.log(events);
        this.events = events;
      }, (error) => {console.error(error); }
    );
  }
  activateSubmit(){
    this.appService.activateBomber(this.activateForm.value.phone, this.activateForm.value.minutes).subscribe(
      (event: any) => {
        console.log(event);
        this.events.push(event);
      }, (error) => {console.error(error);this.error = error.error.text; }
    );
  }
  getExpiredTrialDate(dateStart: string, month: number) : string {
    return this.dateService.prettyDate(this.dateService.getExpired(month, new Date(dateStart)));
  }
  off(id: number) : void {
    this.appService.off(String(id)).subscribe((data:any) => {
      if(data == true) this.events = this.events.filter((event:any) => event.id != id);
    }, (error) => { console.error(error); });
  }
}
