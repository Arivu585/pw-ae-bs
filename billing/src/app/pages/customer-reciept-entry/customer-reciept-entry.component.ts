import { Component, OnInit } from '@angular/core';
import { BillService } from '../../bill.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-customer-reciept-entry',
    templateUrl: './customer-reciept-entry.component.html',
    styleUrl: './customer-reciept-entry.component.css',
    standalone: false
})
export class CustomerRecieptEntryComponent implements OnInit{

  constructor(private bill:BillService,private router:Router,private route:ActivatedRoute){}
cid:any;
  invoice:any;
  ngOnInit(): void {
    this.route.params.subscribe((get)=>{
      this.cid=get["id"];
    })

    if(localStorage.getItem("aid")==null){
      this.router.navigate(["/login"]);
    }

    this.bill.invoiceCreditAll(this.cid).subscribe((data)=>{
      this.invoice=data["data"];
    });
  }
}