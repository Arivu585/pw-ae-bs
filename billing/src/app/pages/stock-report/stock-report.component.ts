import { Component, OnInit } from '@angular/core';
import { BillService } from '../../bill.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrl: './stock-report.component.css'
})
export class StockReportComponent implements OnInit{

  constructor(private bill:BillService,private router:Router){}

  stock:any;
  product:any;
  ngOnInit(): void {
    if(localStorage.getItem("aid")==null){
      this.router.navigate(["/login"]);
    }

    this.bill.stockQty().subscribe((data)=>{
      this.stock=data["data"];
    });
  }
}
