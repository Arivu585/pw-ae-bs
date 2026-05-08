import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  httpOptions: any;
  constructor(private http: HttpClient) {
    var a = "admin"
    var b = "12345"

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(a + ":" + b)
      })
    };
  }

  //login
  login(data: any): Observable<any> {
    return this.http.post("http://localhost/api/billing/admin_login.php", data);
  }

  //admin details
  adminSingle(id: string): Observable<any> {
    return this.http.get("http://localhost/api/billing/admin.php?id=" + id);
  }

  //admin-pass-edit
  adminPassEdit(id: string, data: any): Observable<any> {
    return this.http.put("http://localhost/api/billing/admin.php?apid=" + id, data);
  }

  //product
  productAdd(data: any): Observable<any> {
    return this.http.post("http://localhost:5000/products", data, this.httpOptions);
  }
  productEdit(id: string, data: any): Observable<any> {
    return this.http.put("http://localhost:5000/products/" + id, data, this.httpOptions);
  }
  productSingle(id: string): Observable<any> {
    return this.http.get("http://localhost:5000/products/" + id, this.httpOptions,);
  }
  productAll(): Observable<any> {
    return this.http.get('http://localhost:5000/products', this.httpOptions);
  }
  productDelete(id: string): Observable<any> {
    return this.http.delete("http://localhost:5000/products/" + id, this.httpOptions,);
  }

  //stock
  stockAdd(data: any): Observable<any> {
    return this.http.post("http://localhost/api/billing/stock.php", data);
  }
  stockEdit(id: string, data: any): Observable<any> {
    return this.http.put("http://localhost/api/billing/stock.php?sid=" + id, data);
  }
  stockSingle(id: string): Observable<any> {
    return this.http.get("http://localhost/api/billing/stock.php?sid=" + id);
  }
  stockQty(): Observable<any> {
    return this.http.get("http://localhost/api/billing/stock.php?sqid=" + "1");
  }
  stockAll(): Observable<any> {
    return this.http.get("http://localhost/api/billing/stock.php");
  }
  stockDelete(id: string): Observable<any> {
    return this.http.delete("http://localhost/api/billing/stock.php?sid=" + id);
  }

  //customer
  customerAdd(data: any): Observable<any> {
    return this.http.post("http://localhost:5000/customer", data, this.httpOptions);
  }
  customerEdit(id: string, data: any): Observable<any> {
    return this.http.put("http://localhost:5000/customer/" + id, data, this.httpOptions);
  }
  customerSingle(id: string): Observable<any> {
    return this.http.get("http://localhost:5000/customer/" + id, this.httpOptions);
  }
  customerAll(): Observable<any> {
    return this.http.get("http://localhost:5000/customer", this.httpOptions);
  }
  customerDelete(id: string): Observable<any> {
    return this.http.delete("http://localhost:5000/customer/" + id, this.httpOptions);
  }
  getCustomerOnly(): Observable<any> {
    let type = "Customer";
    return this.http.get("http://localhost:5000/customerType/" + type, this.httpOptions);
  }
  getSupplierOnly(): Observable<any> {
    let type = "Supplier";
    return this.http.get("http://localhost:5000/customerType/" + type, this.httpOptions);
  }

  //invoice
  invoiceAdd(data: any): Observable<any> {
    return this.http.post("http://localhost:5000/invoice", data, this.httpOptions);
  }
  invoiceEdit(id: string, data: any): Observable<any> {
    return this.http.put("http://localhost/api/billing/invoice.php?iid=" + id, data);
  }
  invoiceSingle(id: string): Observable<any> {
    return this.http.get("http://localhost/api/billing/invoice.php?iid=" + id);
  }
  invoiceAll(): Observable<any> {
    return this.http.get("http://localhost/api/billing/invoice.php");
  }
  invoiceDelete(id: string): Observable<any> {
    return this.http.delete("http://localhost/api/billing/invoice.php?iid=" + id);
  }
  invoiceCredit(): Observable<any> {
    return this.http.get("http://localhost/api/billing/invoice.php?pay=" + "Credit");
  }
  invoiceCreditAll(id: string): Observable<any> {
    return this.http.get("http://localhost/api/billing/invoice.php?cid=" + id);
  }

  //purchase
  purchaseAdd(data: any): Observable<any> {
    return this.http.post("http://localhost/api/billing/purchase.php", data);
  }
  purchaseEdit(id: string, data: any): Observable<any> {
    return this.http.put("http://localhost/api/billing/purchase.php?phid=" + id, data);
  }
  purchaseSingle(id: string): Observable<any> {
    return this.http.get("http://localhost/api/billing/purchase.php?phid=" + id);
  }
  purchaseAll(): Observable<any> {
    return this.http.get("http://localhost/api/billing/purchase.php");
  }
  purchaseDelete(id: string): Observable<any> {
    return this.http.delete("http://localhost/api/billing/purchase.php?phid=" + id);
  }
  purchaseCredit(): Observable<any> {
    return this.http.get("http://localhost/api/billing/purchase.php?pay=" + "Credit");
  }
}