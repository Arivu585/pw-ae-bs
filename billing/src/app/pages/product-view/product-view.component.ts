import { Component, OnInit } from '@angular/core';
import { BillService } from '../../bill.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    styleUrl: './product-view.component.css',
    standalone: false
})
export class ProductViewComponent implements OnInit{

  constructor(private bill:BillService,private router:Router){}

  product:any;
  ngOnInit(): void {
    if(localStorage.getItem("aid")==null){
      this.router.navigate(["/login"]);
    }

    this.bill.productAll().subscribe((data)=>{
      this.product=data["data"];
    });
  }

  delete:boolean=false;
  close(){
    this.delete=false;
  }

  remove(pid:string,index:number){
    this.bill.productDelete(pid).subscribe((data)=>{
      this.product.splice(index,1);
      this.delete=true;
    })
  }
}
