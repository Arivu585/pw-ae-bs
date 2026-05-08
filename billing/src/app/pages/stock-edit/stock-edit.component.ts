import { Component, OnInit } from '@angular/core';
import { BillService } from '../../bill.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrl: './stock-edit.component.css'
})
export class StockEditComponent implements OnInit{

  constructor(private bill:BillService,private fb:FormBuilder,private router:Router,private route:ActivatedRoute){}
  sid:any;
  product:any;
  stock:any;
  ngOnInit(): void {
    if(localStorage.getItem("aid")==null){
      this.router.navigate(["/login"]);
    }

    this.bill.productAll().subscribe((data)=>{
      this.product=data["data"];
    });

    this.route.params.subscribe((a)=>{
      this.sid = a["id"];
      this.bill.stockSingle(this.sid).subscribe((data)=>{
        this.stock=data["data"];
        this.stockForm.controls["date"].setValue(this.stock["date"]);
        this.stockForm.controls["pid"].setValue(this.stock["pid"]);
        this.stockForm.controls["qty"].setValue(this.stock["qty"]);
        this.stockForm.controls["phrate"].setValue(this.stock["phrate"]);
      });
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

  edit:boolean=false;
  close(){
    this.edit=false;
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
      var data=JSON.stringify(a);
      this.bill.stockEdit(this.sid,data).subscribe((data)=>{
        if(data["status"]==true){
          this.edit=true;
        }
      });
    }
  }
}