import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BillService } from '../../bill.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-purchase-entry',
  templateUrl: './purchase-entry.component.html',
  styleUrl: './purchase-entry.component.css'
})
export class PurchaseEntryComponent implements OnInit{
  
  customer:any;
  product:any;

  private subs= new Subscription();

  constructor(private bill:BillService,private fb:FormBuilder,private router:Router){}  

  /*
    To check input is text or password with bitwise operator
    isshow:boolean=false;
    <input [type]="isshow?'text':'password'">
  */

  ngOnInit(): void {
    if(localStorage.getItem("aid")==null){
      this.router.navigate(["/login"]);
    }

    //get supplier
    this.bill.getSupplierOnly().subscribe((data)=>{
      this.customer=data["data"];
    });

    //get products
    this.bill.productAll().subscribe((data)=>{
      this.product=data["data"];
    });

    this.indet();

    //execute when table value change
    this.subs.add(this.products.valueChanges.subscribe(
      v =>{
        this.ototal();
      }
    ));
  }

  indet(){
    //get current date
    var today=formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.purchaseForm.controls["phdate"].setValue(today);

    //remove table row as default
    for(let i=0;i<this.products.length;i++){
      this.removeRow(i);
    }

    this.addRow();
    this.purchaseForm.controls["phtotal"].setValue("");
    this.purchaseForm.controls["phpend"].setValue("");
  }

  numOnly(e:KeyboardEvent){
    const pattern=/[0-9]/;
    const input=String.fromCharCode(e.charCode);
    if(!pattern.test(input)){
      e.preventDefault();
    }
  }

  /*Table Start*/
  get products(){
    return this.purchaseForm.controls["products"] as FormArray;
  }

  createRow():FormGroup{
    return this.fb.group({
      pid:['',[Validators.required]],
      phrate:[{value:'',disabled:true},[Validators.required]],
      qty:[{value:'',disabled:true},[Validators.required]],
      rtotal:[],
    });
  }

  addRow(){
    this.products.push(this.createRow());
  }

  removeRow(i:number){
    this.products.removeAt(i);
  }
  /*Table End*/

  /*Form Start*/
  purchaseForm=this.fb.group({
    phno:["",[Validators.required]],
    phdate:["",[Validators.required]],
    products:this.fb.array([]),

    bsupplier:["",[Validators.required]],
    baddress:[""],
    bcontact:[""],
    bcity:[""],

    phtotal:["",[Validators.required]],
    phpaid:[{value:'',disabled:true},[Validators.required]],
    phpend:[""],
    phpay:["",[Validators.required]],
  });
  /*Form End*/

  //Select bill Supplier
  billSupplier(event:any){
    var cid=event.target.value;
    this.bill.customerSingle(cid).subscribe((data)=>{
      var detail=data["data"];
      this.purchaseForm.controls["baddress"].setValue(detail.address);
      this.purchaseForm.controls["bcity"].setValue(detail.city);
      this.purchaseForm.controls["bcontact"].setValue(detail.contact);
    });
  }

  //Product Select
  selectProduct(index:number){
    this.purchaseForm.controls["products"].at(index).get("phrate")?.enable()
    this.purchaseForm.controls["products"].at(index).get("qty")?.enable()
    this.purchaseForm.controls["products"].at(index).get("phrate")?.setValue("");
    this.purchaseForm.controls["products"].at(index).get("qty")?.setValue(1);
    this.purchaseForm.controls["products"].at(index).get("rtotal")?.setValue('');
    this.purchaseForm.controls["phpaid"].enable();
  }

  //price Changes
  changePrice(event:any,index:number){
    var phrate=event.target.value;
    var qty = this.purchaseForm.controls["products"].at(index).get("qty")?.value;
    var rtotal=phrate*qty;
    this.purchaseForm.controls["products"].at(index).get("rtotal")?.setValue(rtotal);
  }

  //Quantity Changes
  changeQty(event:any,index:number){
    var qty=event.target.value;
    var phrate= this.purchaseForm.controls["products"].at(index).get("phrate")?.value;
    var rtotal=phrate*qty;
    this.purchaseForm.controls["products"].at(index).get("rtotal")?.setValue(rtotal);
  }

  /*
  both are same.
  this.purchaseForm.controls["products"].at(i).get("rtotal")?.value == this.products.at(i).value.rtotal;
  */

  //OverAll Total Calc
  option:boolean=false;
  ototal(){
    var total=0;
    for(let i=0;i<this.products.length;i++){
      var rtotal=this.products.at(i).value.rtotal;
      total+=Number(rtotal);
    }
    this.purchaseForm.controls["phtotal"].setValue(total.toString());
    var paid=Number(this.purchaseForm.controls["phpaid"].value);
    var total=Number(this.purchaseForm.controls["phtotal"].value);
    var balance=Number(total-paid);
    this.purchaseForm.controls["phpend"].setValue(balance.toString());
    if(balance == 0){
      this.option=true;
      this.purchaseForm.controls["phpay"].setValue("");
      this.purchaseForm.controls["phpend"].clearValidators();
    }else{
      this.option=false;
      this.purchaseForm.controls["phpay"].setValue("");
    }
  }

  //Calc Paid
  paid(event:any){
    var paid=event.target.value;
    var total=Number(this.purchaseForm.controls["phtotal"].value);
    var balance:any=Number(total-paid);
    this.purchaseForm.controls["phpend"].setValue(balance);
    if(total>paid){
      this.purchaseForm.controls["phpaid"].addValidators([Validators.max(total)]);
    }
    if(balance == 0){
      this.option=true;
      this.purchaseForm.controls["phpay"].setValue("");
    }else{
      this.option=false;
      this.purchaseForm.controls["phpay"].setValue("");
    }
    
  }

  //Form Submit
  status:boolean=false;
  saveData(){
    this.purchaseForm.markAllAsTouched();
    if(this.purchaseForm.valid){
      var a = {
        phno:this.purchaseForm.get("phno")?.value,
        phdate:this.purchaseForm.get("phdate")?.value,
        bcid:this.purchaseForm.get("bsupplier")?.value,
        phtotal:this.purchaseForm.get("phtotal")?.value,
        phpaid:this.purchaseForm.get("phpaid")?.value,
        phpend:this.purchaseForm.get("phpend")?.value,
        phpay:this.purchaseForm.get("phpay")?.value,
        products:this.purchaseForm.get("products")?.value,
      };
      var data=JSON.stringify(a);
      this.bill.purchaseAdd(data).subscribe((res)=>{
        if(res["status"]==true){
          this.purchaseForm.reset();
          this.status=true;
          this.indet();
        }
      });
    }
  };

  //alert close
  close(){
    this.status=false;
  }
}