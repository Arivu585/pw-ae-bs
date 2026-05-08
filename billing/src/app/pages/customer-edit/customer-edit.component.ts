import { Component, OnInit } from '@angular/core';
import { BillService } from '../../bill.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css'
})
export class CustomerEditComponent implements OnInit{

  constructor(private bill:BillService,private fb:FormBuilder,private router:Router,private route:ActivatedRoute){}

  cid:any;
  customer:any;
  ngOnInit(): void {
    if(localStorage.getItem("aid")==null){
      this.router.navigate(["/login"]);
    }

    this.route.params.subscribe((a)=>{
      this.cid = a["id"];
      this.bill.customerSingle(this.cid).subscribe((data)=>{
        this.customer=data["data"];
        this.customerForm.controls["cname"].setValue(this.customer[0]["cname"]);
        this.customerForm.controls["address"].setValue(this.customer[0]["address"]);
        this.customerForm.controls["city"].setValue(this.customer[0]["city"]);
        this.customerForm.controls["contact"].setValue(this.customer[0]["contact"]);
        this.customerForm.controls["type"].setValue(this.customer[0]["type"]);
      });
    });
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
      this.bill.customerEdit(this.cid,data).subscribe((data)=>{
        if(data["status"]==true){
          this.status=true;
        }
      });
    }
  }
}