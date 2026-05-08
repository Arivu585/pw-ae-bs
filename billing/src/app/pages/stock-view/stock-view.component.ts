import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillService } from '../../bill.service';

@Component({
  selector: 'app-stock-view',
  templateUrl: './stock-view.component.html',
  styleUrl: './stock-view.component.css'
})
export class StockViewComponent implements OnInit{

  constructor(private bill:BillService,private router:Router){}

  stock:any;
  ngOnInit(): void {
    if(localStorage.getItem("aid")==null){
      this.router.navigate(["/login"]);
    }

    this.bill.stockAll().subscribe((data)=>{
      this.stock=data["data"];
    });
  }

  delete:boolean=false;
  close(){
    this.delete=false;
  }

  remove(sid:string,index:number){
    this.bill.stockDelete(sid).subscribe((data)=>{
      this.stock.splice(index,1);
      this.delete=true;
    })
  }
}