import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  profile : any = null;
  constructor(private appService : AppService, private eventsService : EventsService, private router : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("accesstoken")) 
    this.appService.getProfile().subscribe((profile) => {
      this.profile = profile;
    }, (error)=> console.error(error));
    this.eventsService.authEmitter.subscribe((profile) => {
      this.profile = profile;
    });
  }
  logout(){
    this.eventsService.authEmitter.emit(null);
    localStorage.removeItem("accesstoken");
    this.router.navigate(['/login']);
  }
}
