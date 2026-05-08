import { Component, OnInit } from '@angular/core';
import { BillService } from '../../bill.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrl: './product-entry.component.css'
})
export class ProductEntryComponent implements OnInit{

  constructor(private bill:BillService,private fb:FormBuilder,private router:Router){}

  ngOnInit(): void {
    if(localStorage.getItem("aid")==null){
      this.router.navigate(["/login"]);
    }
  }

  productForm=this.fb.group({
    pname:["",[Validators.required,Validators.minLength(6)]],
    rate:["",[Validators.required]],
    code:["",[Validators.required]],
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
    this.productForm.markAllAsTouched();
    if(this.productForm.valid){
      var a ={
        pname:this.productForm.get("pname")?.value,
        rate:this.productForm.get("rate")?.value,
        code:this.productForm.get("code")?.value,
      };
      var data=JSON.stringify(a);
      this.bill.productAdd(data).subscribe((data)=>{
        if(data["status"]==true){
          this.status=true;
          this.productForm.reset();
        }
      });
    }
  }
}