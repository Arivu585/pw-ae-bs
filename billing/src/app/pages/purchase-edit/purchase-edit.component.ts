import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BillService } from '../../bill.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-purchase-edit',
    templateUrl: './purchase-edit.component.html',
    styleUrl: './purchase-edit.component.css',
    standalone: false
})
export class PurchaseEditComponent implements OnInit{
  
  supplier:any;
  product:any;
  phid:any;
  purchase:any;

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
      this.phid=get["id"];
    });

    this.bill.purchaseSingle(this.phid).subscribe((res)=>{
      this.purchase=res["data"];
      //Bill number & date
      this.purchaseForm.controls["phno"]?.setValue(this.purchase.at(0).phno);
      this.purchaseForm.controls["phdate"]?.setValue(this.purchase.at(0).phdate);

      //bill 
      this.purchaseForm.controls["bsupplier"]?.setValue(this.purchase.at(0).bcid);
      this.bill.customerSingle(this.purchase.at(0).bcid).subscribe((data)=>{
        var detail=data["data"];
        this.purchaseForm.controls["baddress"].setValue(detail.address);
        this.purchaseForm.controls["bcity"].setValue(detail.city);
        this.purchaseForm.controls["bcontact"].setValue(detail.contact);
      });
      
      //table foot
      this.purchaseForm.controls["phtotal"]?.setValue(this.purchase.at(0).phtotal);
      this.purchaseForm.controls["phpaid"]?.setValue(this.purchase.at(0).phpaid);
      this.purchaseForm.controls["phpaid"]?.enable();
      this.purchaseForm.controls["phpend"]?.setValue(this.purchase.at(0).phpend);
      this.purchaseForm.controls["phpay"]?.setValue(this.purchase.at(0).phpay);
      //table body
      for(let i=0;i<this.purchase.length;i++){
        this.addRow();
        var a=this.purchase.at(i);
        this.products.at(i).get("pid")?.setValue(a.pid);
        this.products.at(i).get("phrate")?.enable();
        this.products.at(i).get("phrate")?.setValue(a.phrate);
        this.products.at(i).get("qty")?.enable();
        this.products.at(i).get("qty")?.setValue(a.qty);
        this.products.at(i).get("rtotal")?.setValue(a.rtotal);
      }
    });

    this.bill.getSupplierOnly().subscribe((data)=>{
      this.supplier=data["data"];
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
    phpend:["",Validators.required],
    phpay:["",[Validators.required]],
  });
  

  numOnly(e:KeyboardEvent){
    const pattern=/[0-9]/;
    const input=String.fromCharCode(e.charCode);
    if(!pattern.test(input)){
      e.preventDefault();
    }
  }

  billSupplier(event:any){
    var cid=event.target.value;
    this.bill.customerSingle(cid).subscribe((data)=>{
      var detail=data["data"];
      this.purchaseForm.controls["baddress"].setValue(detail.address);
      this.purchaseForm.controls["bcity"].setValue(detail.city);
      this.purchaseForm.controls["bcontact"].setValue(detail.contact);
      this.purchaseForm.controls["phpend"].clearValidators();
    });
  }

  selectProduct(event:any,index:number){
    var pid=event.target.value;
    this.bill.productSingle(pid).subscribe((data)=>{
      var product=data["data"];
      this.purchaseForm.controls["products"].at(index).get("phrate")?.setValue(product?.phrate);
      this.purchaseForm.controls["products"].at(index).get("qty")?.setValue("1");
      this.purchaseForm.controls["products"].at(index).get("rtotal")?.setValue(product?.phrate);
      this.purchaseForm.controls["products"].at(index).get("qty")?.enable()
    });
  }

  //price Changes
  changePrice(event:any,index:number){
    var phrate=event.target.value;
    var qty = this.purchaseForm.controls["products"].at(index).get("qty")?.value;
    var rtotal=phrate*qty;
    this.purchaseForm.controls["products"].at(index).get("rtotal")?.setValue(rtotal);
  }

  changeQty(event:any,index:number){
    var qty=event.target.value;
    var phrate= this.purchaseForm.controls["products"].at(index).get("phrate")?.value;
    var rtotal=phrate*qty;
    this.purchaseForm.controls["products"].at(index).get("rtotal")?.setValue(rtotal);
  }

  /*
  both are same -
  this.purchaseForm.controls["products"].at(i).get("rtotal")?.value == this.products.at(i).value.rtotal;
  */

  //get overall total
  ototal(){
    var total:any=0;
    for(let i=0;i<this.products.length;i++){
      var rtotal=this.products.at(i).value.rtotal;
      total+=Number(rtotal);
    }
    this.purchaseForm.controls["phtotal"].setValue(total.toString());
    var paid=Number(this.purchaseForm.controls["phpaid"].value);
    var total:any=Number(this.purchaseForm.controls["phtotal"].value);
    var balance=Number(total-paid);
    this.purchaseForm.controls["phpend"].setValue(balance.toString());
    if(balance == 0){
      this.option=true;
      if(this.purchase.at(0).phpay == "Cash"){
        this.purchaseForm.controls["phpay"].setValue("Cash");
      }else{
        this.purchaseForm.controls["phpay"].setValue("UPI");
      }
      this.purchaseForm.controls["phpend"].clearValidators();
    }else{
      this.option=false;
      this.purchaseForm.controls["phpay"].setValue("Credit");
    }
  }

  //Calc Paid
  option:boolean=false;
  paid(event:any){
    var paid=event.target.value;
    var total=Number(this.purchaseForm.controls["phtotal"].value);
    var balance=Number(total-paid);
    this.purchaseForm.controls["phpend"].setValue(balance.toString());
    if(total>paid){
      this.purchaseForm.controls["phpaid"].addValidators([Validators.max(total)]);
    }
    var balance=Number(this.purchaseForm.controls["phpend"].value);
    if(balance == 0){
      this.option=true;
      if(this.purchase.at(0).phpay == "Cash"){
        this.purchaseForm.controls["phpay"].setValue("Cash");
      }else{
        this.purchaseForm.controls["phpay"].setValue("UPI");
      }
      this.purchaseForm.controls["phpend"].clearValidators();
    }else{
      this.option=false;
      this.purchaseForm.controls["phpay"].setValue("Credit");
    }
  }

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
      this.bill.purchaseEdit(this.phid,data).subscribe((res)=>{
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