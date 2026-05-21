import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import numberToWords from 'number-to-words';
import { BillService } from '../../bill.service';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-purchase-print',
    templateUrl: './purchase-print.component.html',
    styleUrl: './purchase-print.component.css',
    standalone: false
})
export class PurchasePrintComponent implements OnInit{

  constructor(private route:ActivatedRoute,private bill:BillService){}

  phid:any;
  purchase:any;
  date:any;
  total:any;
  supplier:any;
  ngOnInit(): void {
    this.route.params.subscribe((get)=>{
      this.phid=get["id"];
    });
    this.bill.purchaseSingle(this.phid).subscribe((res)=>{
      this.purchase=res["data"];
      var cid=this.purchase?.at(0).bcid;
      var total=this.purchase?.at(0).phtotal;
      this.total=numberToWords.toWords(total);
      var date=this.purchase?.at(0).phdate;
      this.date=formatDate(date,'dd-MM-yyyy','en');
      this.bill.customerSingle(cid).subscribe((res)=>{
        this.supplier=res["data"];
      });
    });
  }

  print(){
    window.print();
  }
}
