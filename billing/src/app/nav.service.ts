import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  login= new BehaviorSubject("");
  aname:String | any;
  
  constructor(){
    if(localStorage.getItem("aname") == null){
      this.login.next("login");
    }else{
      this.aname= localStorage.getItem("aname");
      this.login.next(this.aname);
    }
  }

  currentLogin=this.login.asObservable();

  updateLogin(newLogin:string){
    this.login.next(newLogin);
  }
}
