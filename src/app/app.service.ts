import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  getHeaders(){
    return new HttpHeaders({
      "accesstoken" : String(localStorage.getItem("accesstoken"))
    });
  }
  getProfile() {
    let headers = this.getHeaders();
    return this.http.get(environment.serverUrl + '/user/profile', { headers });
  }
  login(form: any) {
    return this.http.post(environment.serverUrl + '/auth/login',  form );
  }
  register(form: any) {
    return this.http.post(environment.serverUrl + '/auth/register',  form );
  }
  activateBomber(phone: string, minutes: string){
    let headers = this.getHeaders();
    return this.http.get(environment.serverUrl + '/bomber/start/'+phone + '/'+minutes, { headers });
  }
  activations(){
    let headers = this.getHeaders();
    return this.http.get(environment.serverUrl + '/bomber/activations', { headers });
  }
  subscribtions(){
    return this.http.get(environment.serverUrl + '/subscribtion/all');
  }
  subscribtionByName(name: string){
    return this.http.get(environment.serverUrl + '/subscribtion/'+name);
  }
  buy(subName: string, month: number, cardDetails: any){
    let headers = this.getHeaders();
    return this.http.post(environment.serverUrl + '/subscribtion/buy/'+subName+'/'+String(month), cardDetails, { headers });
  }
  off(id: string){
    let headers = this.getHeaders();
    return this.http.get(environment.serverUrl + '/bomber/off/'+id, { headers });
  }
}
