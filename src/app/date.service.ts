import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getExpired(month: number, date: Date) : Date {
    return new Date(date.setMonth(date.getMonth()+month));
  }
  prettyDate(d: Date) : string {
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

    return `${da}-${mo}-${ye}`;
  }
}
