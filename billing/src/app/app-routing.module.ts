import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { InvoiceEntryComponent } from './pages/invoice-entry/invoice-entry.component';
import { InvoiceViewComponent } from './pages/invoice-view/invoice-view.component';
import { InvoiceEditComponent } from './pages/invoice-edit/invoice-edit.component';
import { ProductEntryComponent } from './pages/product-entry/product-entry.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { StockEntryComponent } from './pages/stock-entry/stock-entry.component';
import { StockViewComponent } from './pages/stock-view/stock-view.component';
import { StockEditComponent } from './pages/stock-edit/stock-edit.component';
import { StockReportComponent } from './pages/stock-report/stock-report.component';
import { CustomerEntryComponent } from './pages/customer-entry/customer-entry.component';
import { CustomerViewComponent } from './pages/customer-view/customer-view.component';
import { CustomerEditComponent } from './pages/customer-edit/customer-edit.component';
import { CustomerRecieptComponent } from './pages/customer-reciept/customer-reciept.component';
import { SupplierRecieptComponent } from './pages/supplier-reciept/supplier-reciept.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { PurchaseEntryComponent } from './pages/purchase-entry/purchase-entry.component';
import { PurchaseViewComponent } from './pages/purchase-view/purchase-view.component';
import { PurchaseEditComponent } from './pages/purchase-edit/purchase-edit.component';
import { PurchasePrintComponent } from './pages/purchase-print/purchase-print.component';
import { InvoicePrintComponent } from './pages/invoice-print/invoice-print.component';
import { CustomerRecieptEntryComponent } from './pages/customer-reciept-entry/customer-reciept-entry.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"login",
    pathMatch:"full"
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"invoice_entry",
    component:InvoiceEntryComponent
  },
  {
    path:"invoice_view",
    component:InvoiceViewComponent
  },
  {
    path:"invoice_edit/:id",
    component:InvoiceEditComponent
  },
  {
    path:"invoice_print/:id",
    component:InvoicePrintComponent
  },
  {
    path:"purchase_entry",
    component:PurchaseEntryComponent
  },
  {
    path:"purchase_view",
    component:PurchaseViewComponent
  },
  {
    path:"purchase_edit/:id",
    component:PurchaseEditComponent
  },
  {
    path:"purchase_print/:id",
    component:PurchasePrintComponent
  },
  {
    path:"product_entry",
    component:ProductEntryComponent
  },
  {
    path:"product_view",
    component:ProductViewComponent
  },
  {
    path:"product_edit/:id",
    component:ProductEditComponent
  },
  {
    path:"stock_report",
    component:StockReportComponent
  },
  {
    path:"stock_entry",
    component:StockEntryComponent
  },
  {
    path:"stock_view",
    component:StockViewComponent
  },
  {
    path:"stock_edit/:id",
    component:StockEditComponent
  },
  {
    path:"customer_reciept",
    component:CustomerRecieptComponent
  },
  {
    path:"customer_reciept_entry/:id",
    component:CustomerRecieptEntryComponent
  },
  {
    path:"supplier_reciept",
    component:SupplierRecieptComponent
  },
  {
    path:"customer_entry",
    component:CustomerEntryComponent
  },
  {
    path:"customer_view",
    component:CustomerViewComponent
  },
  {
    path:"customer_edit/:id",
    component:CustomerEditComponent
  },
  {
    path:"change_password",
    component:ChangePasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
