import { Component, OnInit } from '@angular/core';
import { BillService } from '../../bill.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrl: './product-edit.component.css',
    standalone: false
})
export class ProductEditComponent implements OnInit{
  constructor(private bill:BillService,private fb:FormBuilder,private router:Router,private route:ActivatedRoute){}

  product:any;
  pid:any;
  ngOnInit(): void {
    if(localStorage.getItem("aid")==null){
      this.router.navigate(["/login"]);
    }

    this.route.params.subscribe((a)=>{
      this.pid = a["id"];
      this.bill.productSingle(this.pid).subscribe((data)=>{
        this.product=data["data"];
        console.log(data)
        this.productForm.controls["pname"].setValue(this.product["0"]["pname"]);
        this.productForm.controls["rate"].setValue(this.product["0"]["rate"]);
        this.productForm.controls["code"].setValue(this.product["0"]["code"]);
      });
    });
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

  edit:boolean=false;
  close(){
    this.edit=false;
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
      this.bill.productEdit(this.pid,data).subscribe((data)=>{
        if(data["status"]==true){
          this.edit=true;
        }
      });
    }
  }
}
