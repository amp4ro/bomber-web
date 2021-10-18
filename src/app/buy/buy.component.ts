import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  buyForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    cardNumber: new FormControl(''),
    cvv: new FormControl(''),
    expDate: new FormControl('')
  });
  sub:any = null;
  cost:number = 0;
  constructor(private appService: AppService, private activatedRoute: ActivatedRoute, private router : Router) { }
  month:string="12";
  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        let name = params.sub;
        if(!name) this.router.navigate(['/']);
        this.appService.subscribtionByName(name).subscribe((sub:any) => {
          if(!sub) this.router.navigate(['/']);
          this.sub = sub;
          let month = Number(this.month);
          this.cost = this.getCost(month);
        }, (error) => {console.error(error);})
      }
    );

  }
  changeSubMonth() {

    let month = Number(this.month);
    this.cost = this.getCost(month);
  }
  getCost(month: number) : number {
    if(month == 1) {return this.sub.costPerMonthUSD}
    else if(month == 6) {return this.sub.costPerSixMonthUSD}
    else if(month == 12) {return this.sub.costPerYearUSD}
    else return 0;
  }
  buy(){
    console.log(this.buyForm.value);
    this.appService.buy(this.sub.name, Number(this.month), this.buyForm.value).subscribe((data:any) => {
      console.log(data);
    }, (error) => {console.error(error);})
  }
}
