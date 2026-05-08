import { Component, OnInit } from '@angular/core';
import { BillService } from '../../bill.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrl: './customer-view.component.css'
})
export class CustomerViewComponent implements OnInit{

  constructor(private bill:BillService,private router:Router){}

  customer:any;
  ngOnInit(): void {
    if(localStorage.getItem("aid")==null){
      this.router.navigate(["/login"]);
    }

    this.bill.customerAll().subscribe((data)=>{
      this.customer=data["data"];
    });
  }

  delete:boolean=false;
  close(){
    this.delete=false;
  }

  remove(cid:string,index:number){
    this.bill.customerDelete(cid).subscribe((data)=>{
      this.customer.splice(index,1);
      this.delete=true;
    })
  }
}