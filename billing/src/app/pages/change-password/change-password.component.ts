import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BillService } from '../../bill.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit{
  aid:string|any;
  currentPass:any;
  wrongpass:boolean=false;
  matchpass:boolean=false;
  change:boolean=false;
  constructor(private fb: FormBuilder, private router: Router, private bill: BillService) { }

  ngOnInit(): void {
    if (localStorage.getItem("aid") == null) {
      this.router.navigate(["/login"]);
    }

    //user details
    this.aid = localStorage.getItem("aid");
    this.bill.adminSingle(this.aid).subscribe((res)=>{
      this.currentPass = res["data"]["apass"];
    });
  }

  passForm = this.fb.group({
    opass: ['', [Validators.required]],
    npass: ['', [Validators.required, Validators.minLength(5)]],
    rpass: ['', [Validators.required, Validators.minLength(5)]],
  });

  passData(): void{
    this.passForm.markAllAsTouched();
    if(this.passForm.valid){
      if((this.passForm.get("opass")?.value) == this.currentPass){
        this.wrongpass=false;
        if((this.passForm.get("npass")?.value) == (this.passForm.get("rpass")?.value)){
          this.matchpass=false;
          var a={
              pass:this.passForm.get("npass")?.value,
          };
          var udata = JSON.stringify(a);
          this.bill.adminPassEdit(this.aid,udata).subscribe(()=>{
            this.passForm.reset();
            this.change=true;
          });
        }else{
          this.matchpass=true;
        }
      }else{
        this.wrongpass=true;
      }
    }
  }

  close(){
    this.change=false;
  }
}
