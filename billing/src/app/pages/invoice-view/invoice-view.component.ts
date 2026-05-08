import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillService } from '../../bill.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrl: './invoice-view.component.css'
})
export class InvoiceViewComponent implements OnInit{

  constructor(private bill:BillService,private router:Router){}

  invoice:any;
  customer:any;
  ngOnInit(): void {
    if(localStorage.getItem("aid")==null){
      this.router.navigate(["/login"]);
    }

    this.bill.invoiceAll().subscribe((data)=>{
      this.invoice=data["data"];
    });
  }

  delete:boolean=false;
  close(){
    this.delete=false;
  } 

  remove(iid:string){
    if(confirm("Do you want to Delete this Invoice?")){
      this.invoice.forEach((v:any,i:any)=>{
        if(v.iid == iid){
          this.bill.invoiceDelete(iid).subscribe((data)=>{
            if(data["status"]==true){
              this.invoice.splice(i,1);
              this.delete=true;
            }
          });
        }
      });
    }
  }

  async print(id:any){
    await fetch("http://localhost/api/billing/invoice/sales_invoice.php?id="+id, { method: 'GET', })
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