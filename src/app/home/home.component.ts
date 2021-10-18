import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  best : string = "";
  subscribtions: any = [];
  constructor(private appService: AppService, private router : Router) { }

  ngOnInit(): void {
    this.appService.subscribtions()
    .subscribe((subscribtions: any) => {
        // let max = Math.max.apply(Math, subscribtions.map((sub:any) => sub.costPerMonthUSD));
        // console.log(max);
        // this.best = subscribtions.find((sub:any) => sub.costPerMonthUSD = max).name;
        let max = subscribtions[0].costPerMonthUSD;
        let name;
        for(let sub of subscribtions){
          if(sub.costPerMonthUSD > max) {
            max = sub.costPerMonthUSD;
            name = sub.name;
          }
        }
        this.best = name;
        console.log(this.best);
       this.subscribtions = subscribtions;
     }
    , (error) => {console.error(error);})
  }
  buyPage(sub: string) : void {
    this.router.navigate(['/buy'], { queryParams: { sub } });
  }
}
