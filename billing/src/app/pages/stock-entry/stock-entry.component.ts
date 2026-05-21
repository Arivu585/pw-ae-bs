import { Component, OnInit } from '@angular/core';
import { BillService } from '../../bill.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-stock-entry',
    templateUrl: './stock-entry.component.html',
    styleUrl: './stock-entry.component.css',
    standalone: false
})
export class StockEntryComponent implements OnInit{

  constructor(private bill:BillService,private fb:FormBuilder,private router:Router){}
  product:any;
  ngOnInit(): void {
    if(localStorage.getItem("aid")==null){
      this.router.navigate(["/login"]);
    }

    this.bill.productAll().subscribe((data)=>{
      this.product=data["data"];
    });
  }

  stockForm=this.fb.group({
    date:["",[Validators.required]],
    pid:["",[Validators.required]],
    qty:["",[Validators.required]],
    phrate:["",[Validators.required]],
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
    this.stockForm.markAllAsTouched();
    if(this.stockForm.valid){
      var a ={
        date:this.stockForm.get("date")?.value,
        pid:this.stockForm.get("pid")?.value,
        qty:this.stockForm.get("qty")?.value,
        phrate:this.stockForm.get("phrate")?.value,
      };
      console.log(a);
      var data=JSON.stringify(a);
      this.bill.stockAdd(data).subscribe((data)=>{
        this.stockForm.reset();
        if(data["status"]==true){
          this.status=true;
        }
      });
    }
  }
}