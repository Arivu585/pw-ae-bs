import { Component, OnInit } from '@angular/core';
import { BillService } from '../../bill.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customer-entry',
    templateUrl: './customer-entry.component.html',
    styleUrl: './customer-entry.component.css',
    standalone: false
})
export class CustomerEntryComponent implements OnInit{

  constructor(private bill:BillService,private fb:FormBuilder,private router:Router){}

  ngOnInit(): void {
    if(localStorage.getItem("aid")==null){
      this.router.navigate(["/login"]);
    }
  }

  customerForm=this.fb.group({
    cname:["",[Validators.required]],
    address:["",[Validators.required]],
    city:["",[Validators.required]],
    contact:["",[Validators.required]],
    type:["",[Validators.required]],
  });

  numOnly(e:KeyboardEvent){
    const pattern=/[0-9]/;
    const input=String.fromCharCode(e.charCode);
    if(!pattern.test(input)){
      e.preventDefault();
    }
  }

  status:boolean=false;
  close(){
    this.status=false;
  }

  saveData(){
    this.customerForm.markAllAsTouched();
    if(this.customerForm.valid){
      var a ={
        cname:this.customerForm.get("cname")?.value,
        address:this.customerForm.get("address")?.value,
        city:this.customerForm.get("city")?.value,
        contact:this.customerForm.get("contact")?.value,
        type:this.customerForm.get("type")?.value,
      };
      var data=JSON.stringify(a);
      this.bill.customerAdd(data).subscribe((data)=>{
        this.customerForm.reset();
        if(data["status"]==true){
          this.status=true;
        }
      });
    }
  }
}