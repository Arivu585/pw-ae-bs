import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillService } from '../../bill.service';
import { formatDate } from '@angular/common';
import numberToWords from 'number-to-words';

@Component({
    selector: 'app-invoice-print',
    templateUrl: './invoice-print.component.html',
    styleUrl: './invoice-print.component.css',
    standalone: false
})
export class InvoicePrintComponent implements OnInit{

  constructor(private route:ActivatedRoute,private bill:BillService){}

  iid:any;
  invoice:any;
  date:any;
  total:any;
  bcustomer:any;
  scustomer:any;
  ngOnInit(): void {
    this.route.params.subscribe((get)=>{
      this.iid=get["id"];
    });
    this.bill.invoiceSingle(this.iid).subscribe((res)=>{
      this.invoice=res["data"];
      var bcid=this.invoice?.at(0).bcid;
      this.bill.customerSingle(bcid).subscribe((res)=>{
        this.bcustomer=res["data"];
      });
      var total=this.invoice?.at(0).itotal;
      this.total=numberToWords.toWords(total);
      var date=this.invoice?.at(0).idate;
      this.date=formatDate(date,'dd-MM-yyyy','en');
      var scid=this.invoice?.at(0).scid;
      this.bill.customerSingle(scid).subscribe((res)=>{
        this.scustomer=res["data"];
      });
    });
  }


  print(){
    window.print();
  }
}
