import { Component, OnInit } from '@angular/core';
import { BillService } from '../../bill.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customer-reciept',
    templateUrl: './customer-reciept.component.html',
    styleUrl: './customer-reciept.component.css',
    standalone: false
})
export class CustomerRecieptComponent implements OnInit{

  constructor(private bill:BillService,private router:Router){}

  invoice:any;
  ngOnInit(): void {
    if(localStorage.getItem("aid")==null){
      this.router.navigate(["/login"]);
    }

    this.bill.invoiceCredit().subscribe((data)=>{
      this.invoice=data["data"];
    });
  }
}
