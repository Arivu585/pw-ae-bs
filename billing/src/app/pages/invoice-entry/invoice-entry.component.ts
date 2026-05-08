import { Component, OnInit } from '@angular/core';
import { BillService } from '../../bill.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-invoice-entry',
  templateUrl: './invoice-entry.component.html',
  styleUrl: './invoice-entry.component.css'
})
export class InvoiceEntryComponent implements OnInit{
  
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

    //get Customers
    this.bill.getCustomerOnly().subscribe((data)=>{
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
    this.bill.invoiceAll().subscribe((res)=>{
      var count=res["count"]+1;
      this.invoiceForm.controls["ino"].setValue(count);
    });
    //get current date
    var today=formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.invoiceForm.controls["idate"].setValue(today);

    //remove table row as default
    for(let i=0;i<=this.products.length;i++){
      this.removeRow(i);
    }
    this.addRow();
    this.invoiceForm.controls["itotal"].setValue("");
    this.invoiceForm.controls["ipend"].setValue("");
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
    return this.invoiceForm.controls["products"] as FormArray;
  }

  createRow():FormGroup{
    return this.fb.group({
      pid:['',[Validators.required]],
      rate:[],
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
  invoiceForm=this.fb.group({
    ino:["1",[Validators.required]],
    idate:["",[Validators.required]],
    products:this.fb.array([]),

    bcustomer:["",[Validators.required]],
    baddress:[""],
    bcontact:[""],
    bcity:[""],

    scustomer:["",[Validators.required]],
    saddress:[""],
    scontact:[""],
    scity:[""],

    itotal:["",[Validators.required]],
    ipaid:[{value:'',disabled:true},[Validators.required]],
    ipend:[""],
    ipay:["",[Validators.required]],
  });
  /*Form End*/

  //Select bill customer
  billcustomer(event:any){
    var cid=event.target.value;
    this.bill.customerSingle(cid).subscribe((data)=>{
      var detail=data["data"];
      this.invoiceForm.controls["baddress"].setValue(detail.at(0).address);
      this.invoiceForm.controls["bcity"].setValue(detail.at(0).city);
      this.invoiceForm.controls["bcontact"].setValue(detail.at(0).contact);
    });
  }

  //Select ship customer
  shipcustomer(event:any){
    var cid=event.target.value;
    this.bill.customerSingle(cid).subscribe((data)=>{
      var detail=data["data"];
      this.invoiceForm.controls["saddress"].setValue(detail.at(0).address);
      this.invoiceForm.controls["scity"].setValue(detail.at(0).city);
      this.invoiceForm.controls["scontact"].setValue(detail.at(0).contact);
    });
  }

  //Product Select
  selectProduct(event:any,index:number){
    var pid=event.target.value;
    this.bill.productSingle(pid).subscribe((data)=>{
      var product=data["data"];
      this.invoiceForm.controls["products"].at(index).get("rate")?.setValue(product?.at(0).rate);
      this.invoiceForm.controls["products"].at(index).get("qty")?.setValue("1");
      this.invoiceForm.controls["products"].at(index).get("rtotal")?.setValue(product?.at(0).rate);
      this.invoiceForm.controls["products"].at(index).get("qty")?.enable();
      this.invoiceForm.controls["ipaid"].enable();
    });
  }

  //Quantity Changes
  changeQty(event:any,index:number){
    var qty=event.target.value;
    var rate= this.invoiceForm.controls["products"].at(index).get("rate")?.value;
    var rtotal=rate*qty;
    this.invoiceForm.controls["products"].at(index).get("rtotal")?.setValue(rtotal);
  }

  /*
  both are same.
  this.invoiceForm.controls["products"].at(i).get("rtotal")?.value == this.products.at(i).value.rtotal;
  */

  //OverAll Total Calc
  option:boolean=false;
  ototal(){
    var total=0;
    for(let i=0;i<this.products.length;i++){
      var rtotal=this.products.at(i).value.rtotal;
      total+=Number(rtotal);
    }
    this.invoiceForm.controls["itotal"].setValue(total.toString());
    var paid=Number(this.invoiceForm.controls["ipaid"].value);
    var total=Number(this.invoiceForm.controls["itotal"].value);
    var balance=Number(total-paid);
    this.invoiceForm.controls["ipend"].setValue(balance.toString());
    if(balance == 0){
      this.option=true;
      this.invoiceForm.controls["ipay"].setValue("");
    }else{
      this.option=false;
      this.invoiceForm.controls["ipay"].setValue("");
    }
  }

  //Calc Paid
  paid(event:any){
    var paid=event.target.value;
    var total=Number(this.invoiceForm.controls["itotal"].value);
    var balance:any=Number(total-paid);
    this.invoiceForm.controls["ipend"].setValue(balance);
    if(total>paid){
      this.invoiceForm.controls["ipaid"].addValidators([Validators.max(total)]);
    }
    
    if(balance == 0){
      this.option=true;
      this.invoiceForm.controls["ipay"].setValue("");
    }else{
      this.option=false;
      this.invoiceForm.controls["ipay"].setValue("");
    }
    
  }

  //Form Submit
  status:boolean=false;
  saveData(){
    this.invoiceForm.markAllAsTouched();
    if(this.invoiceForm.valid){
      var a = {
        ino:this.invoiceForm.get("ino")?.value,
        idate:this.invoiceForm.get("idate")?.value,
        bcid:this.invoiceForm.get("bcustomer")?.value,
        scid:this.invoiceForm.get("scustomer")?.value,
        itotal:this.invoiceForm.get("itotal")?.value,
        ipaid:this.invoiceForm.get("ipaid")?.value,
        ipend:this.invoiceForm.get("ipend")?.value,
        ipay:this.invoiceForm.get("ipay")?.value,
        products:this.invoiceForm.get("products")?.value,
      };
      var data=JSON.stringify(a);
      this.bill.invoiceAdd(data).subscribe((res)=>{
        if(res["status"]==true){
          this.invoiceForm.reset();
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