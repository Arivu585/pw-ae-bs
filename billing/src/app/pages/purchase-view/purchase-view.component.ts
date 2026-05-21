import { Component, OnInit } from '@angular/core';
import { BillService } from '../../bill.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-purchase-view',
    templateUrl: './purchase-view.component.html',
    styleUrl: './purchase-view.component.css',
    standalone: false
})
export class PurchaseViewComponent implements OnInit{

  constructor(private bill:BillService,private router:Router){}

  purchase:any;
  ngOnInit(): void {
    if(localStorage.getItem("aid")==null){
      this.router.navigate(["/login"]);
    }

    this.bill.purchaseAll().subscribe((data)=>{
      this.purchase=data["data"];
    });
  }

  delete:boolean=false;
  close(){
    this.delete=false;
  }

  remove(phid:string){
    if(confirm("Do you want to Delete this Purchase?")){
      this.purchase.forEach((v:any,i:any)=>{
        if(v.iid == phid){
          this.bill.purchaseDelete(phid).subscribe((data)=>{
            if(data["status"]==true){
              this.purchase.splice(i,1);
              this.delete=true;
            }
          });
        }
      });
    }
  }

  async print(id:any){
    await fetch("http://localhost/api/billing/invoice/purchase_invoice.php?id="+id, { method: 'GET', })
    .then(response=>{
      if(!response.ok){
      throw new Error(response.statusText);
      }
      return response.blob();
    })
    .then(response=>{
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      window.open(url);
      window.URL.revokeObjectURL(url);
    })
    .catch(error =>{
      console.error('Error downloading file:', error)
    });
  }

}