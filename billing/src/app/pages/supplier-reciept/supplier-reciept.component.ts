import { Component, OnInit } from '@angular/core';
import { BillService } from '../../bill.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-reciept',
  templateUrl: './supplier-reciept.component.html',
  styleUrl: './supplier-reciept.component.css'
})
export class SupplierRecieptComponent implements OnInit{

  constructor(private bill:BillService,private router:Router){}

  bills:any;
  ngOnInit(): void {
    if(localStorage.getItem("aid")==null){
      this.router.navigate(["/login"]);
    }

    this.bill.purchaseCredit().subscribe((data)=>{
      this.bills=data["data"];
    });
  }
}
