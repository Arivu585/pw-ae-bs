import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BillService } from '../../bill.service';
import { Router } from '@angular/router';
import { NavService } from '../../nav.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: false
})
export class LoginComponent implements OnInit{
  constructor(private fb:FormBuilder,private obj:BillService,private route:Router,private nav:NavService){}
  wrong:boolean=false;

  logForm = this.fb.group({
    name:['',[Validators.required]],
    pass:['',[Validators.required]],
  });

  ngOnInit(): void {
    if(localStorage.getItem("aid") != null){
      this.route.navigate(["/home"]);
    }  
  }

  saveData():void{
    this.logForm.markAllAsTouched();
    if(this.logForm.valid){
      var a = {
        aname:this.logForm.get("name")?.value,
        apass:this.logForm.get("pass")?.value
      };
      var data = JSON.stringify(a);
      this.obj.login(data).subscribe((res)=>{
        if(res["status"]==true){
          this.wrong=true;
          localStorage.setItem("aid",res["aid"]);
          localStorage.setItem("aname",res["aname"]);
          
          this.nav.updateLogin(res["aname"]);
          this.route.navigate(["/home"]);
        }else{
          this.wrong=true;
        }
      });
    }
  }
}
