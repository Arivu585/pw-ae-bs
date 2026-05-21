import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BillService } from '../../bill.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-invoice-edit',
    templateUrl: './invoice-edit.component.html',
    styleUrl: './invoice-edit.component.css',
    standalone: false
})
export class InvoiceEditComponent implements OnInit{
  
  customer:any;
  product:any;
  iid:any;
  invoice:any;

  private subs= new Subscription();

  constructor(private route:ActivatedRoute,private bill:BillService,private fb:FormBuilder,private router:Router){}  

  //To check input is text or password with bitwise operator
  //isshow:boolean=false;
  //<input [type]="isshow?'text':'password'">

  ngOnInit(): void {
    if(localStorage.getItem("aid")==null){
      this.router.navigate(["/login"]);
    }
    //get url ID
    this.route.params.subscribe((get)=>{
      this.iid=get["id"];
    });

    this.bill.invoiceSingle(this.iid).subscribe((res)=>{
      this.invoice=res["data"];
      //invoice number & date
      this.invoiceForm.controls["ino"]?.setValue(this.invoice.at(0).ino);
      this.invoiceForm.controls["idate"]?.setValue(this.invoice.at(0).idate);
      //bill
      this.invoiceForm.controls["bcustomer"]?.setValue(this.invoice.at(0).bcid);
      this.bill.customerSingle(this.invoice.at(0).bcid).subscribe((data)=>{
        var detail=data["data"][0];
        
        this.invoiceForm.controls["baddress"].setValue(detail.address);
        this.invoiceForm.controls["bcity"].setValue(detail.city);
        this.invoiceForm.controls["bcontact"].setValue(detail.contact);
      });
      //ship
      this.invoiceForm.controls["scustomer"]?.setValue(this.invoice.at(0).scid);
      this.bill.customerSingle(this.invoice.at(0).scid).subscribe((data)=>{
        var detail=data["data"][0];
        this.invoiceForm.controls["saddress"].setValue(detail.address);
        this.invoiceForm.controls["scity"].setValue(detail.city);
        this.invoiceForm.controls["scontact"].setValue(detail.contact);
      });
      //table foot
      this.invoiceForm.controls["itotal"]?.setValue(this.invoice.at(0).itotal);
      this.invoiceForm.controls["ipaid"]?.setValue(this.invoice.at(0).ipaid);
      this.invoiceForm.controls["ipaid"]?.enable();
      this.invoiceForm.controls["ipend"]?.setValue(this.invoice.at(0).ipend);
      this.invoiceForm.controls["ipay"]?.setValue(this.invoice.at(0).ipay);
      //table body
      for(let i=0;i<this.invoice.length;i++){
        this.addRow();
        var a=this.invoice.at(i);
        this.products.at(i).get("pid")?.setValue(a.pid);
        this.products.at(i).get("rate")?.setValue(a.price);
        this.products.at(i).get("qty")?.enable();
        this.products.at(i).get("qty")?.setValue(a.qty);
        this.products.at(i).get("rtotal")?.setValue(a.rtotal);
      }
    });

    this.bill.getCustomerOnly().subscribe((data)=>{
      this.customer=data["data"];
    });

    this.bill.productAll().subscribe((data)=>{
      this.product=data["data"];
    });

    //execute when table value change
    this.subs.add(this.products.valueChanges.subscribe(
      v =>{
        this.ototal();
      }
    ));
  }

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

  invoiceForm=this.fb.group({
    ino:["",[Validators.required]],
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
    ipend:["",Validators.required],
    ipay:["",[Validators.required]],
  });
  

  numOnly(e:KeyboardEvent){
    const pattern=/[0-9]/;
    const input=String.fromCharCode(e.charCode);
    if(!pattern.test(input)){
      e.preventDefault();
    }
  }

  billcustomer(event:any){
    var cid=event.target.value;
    this.bill.customerSingle(cid).subscribe((data)=>{
      var detail=data["data"];
      this.invoiceForm.controls["baddress"].setValue(detail.address);
      this.invoiceForm.controls["bcity"].setValue(detail.city);
      this.invoiceForm.controls["bcontact"].setValue(detail.contact);
      this.invoiceForm.controls["ipend"].clearValidators();
    });
  }

  shipcustomer(event:any){
    var cid=event.target.value;
    this.bill.customerSingle(cid).subscribe((data)=>{
      var detail=data["data"];
      this.invoiceForm.controls["saddress"].setValue(detail.address);
      this.invoiceForm.controls["scity"].setValue(detail.city);
      this.invoiceForm.controls["scontact"].setValue(detail.contact);
      this.invoiceForm.controls["ipend"].clearValidators();
    });
  }

  selectProduct(event:any,index:number){
    var pid=event.target.value;
    this.bill.productSingle(pid).subscribe((data)=>{
      var product=data["data"];
      this.invoiceForm.controls["products"].at(index).get("rate")?.setValue(product?.rate);
      this.invoiceForm.controls["products"].at(index).get("qty")?.setValue("1");
      this.invoiceForm.controls["products"].at(index).get("rtotal")?.setValue(product?.rate);
      this.invoiceForm.controls["products"].at(index).get("qty")?.enable()
    });
  }

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
  //get overall total
  ototal(){
    var total:any=0;
    for(let i=0;i<this.products.length;i++){
      var rtotal=this.products.at(i).value.rtotal;
      total+=Number(rtotal);
    }
    this.invoiceForm.controls["itotal"].setValue(total.toString());
    var paid=Number(this.invoiceForm.controls["ipaid"].value);
    var total:any=Number(this.invoiceForm.controls["itotal"].value);
    var balance=Number(total-paid);
    this.invoiceForm.controls["ipend"].setValue(balance.toString());
    if(balance == 0){
      this.option=true;
      if(this.invoice.at(0).ipay == "Cash"){
        this.invoiceForm.controls["ipay"].setValue("Cash");
      }else{
        this.invoiceForm.controls["ipay"].setValue("UPI");
      }
      this.invoiceForm.controls["ipend"].clearValidators();
    }else{
      this.option=false;
      this.invoiceForm.controls["ipay"].setValue("Credit");
    }
  }

  //Calc Paid
  option:boolean=false;
  paid(event:any){
    var paid=event.target.value;
    var total=Number(this.invoiceForm.controls["itotal"].value);
    var balance=Number(total-paid);
    this.invoiceForm.controls["ipend"].setValue(balance.toString());
    this.invoiceForm.controls["ipaid"].addValidators([Validators.max(total)]);
    var balance=Number(this.invoiceForm.controls["ipend"].value);
    if(balance == 0){
      this.option=true;
      if(this.invoice.at(0).ipay == "Cash"){
        this.invoiceForm.controls["ipay"].setValue("Cash");
      }else{
        this.invoiceForm.controls["ipay"].setValue("UPI");
      }
      this.invoiceForm.controls["ipend"].clearValidators();
    }else{
      this.option=false;
      this.invoiceForm.controls["ipay"].setValue("Credit");
    }
  }

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
        ipend:this.invoiceForm.get("ipend")?.value?.toString(),
        ipay:this.invoiceForm.get("ipay")?.value,
        products:this.invoiceForm.get("products")?.value,
      };
      var data=JSON.stringify(a);
      console.log(data)
      this.bill.invoiceEdit(this.iid,data).subscribe((res)=>{
        if(res["status"]==true){
          this.status=true;
        }
      });
    }
  }

  close(){
    this.status=false;
  }
}