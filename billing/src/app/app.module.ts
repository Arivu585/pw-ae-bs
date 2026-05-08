import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/include/header/header.component';
import { FooterComponent } from './pages/include/footer/footer.component';
import { SidebarComponent } from './pages/include/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InvoiceEntryComponent } from './pages/invoice-entry/invoice-entry.component';
import { InvoiceViewComponent } from './pages/invoice-view/invoice-view.component';
import { InvoiceEditComponent } from './pages/invoice-edit/invoice-edit.component';
import { ProductEntryComponent } from './pages/product-entry/product-entry.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { StockEditComponent } from './pages/stock-edit/stock-edit.component';
import { StockEntryComponent } from './pages/stock-entry/stock-entry.component';
import { StockViewComponent } from './pages/stock-view/stock-view.component';
import { StockReportComponent } from './pages/stock-report/stock-report.component';
import { CustomerEntryComponent } from './pages/customer-entry/customer-entry.component';
import { CustomerEditComponent } from './pages/customer-edit/customer-edit.component';
import { CustomerViewComponent } from './pages/customer-view/customer-view.component';
import { CustomerRecieptComponent } from './pages/customer-reciept/customer-reciept.component';
import { SupplierRecieptComponent } from './pages/supplier-reciept/supplier-reciept.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { PurchaseEntryComponent } from './pages/purchase-entry/purchase-entry.component';
import { PurchaseViewComponent } from './pages/purchase-view/purchase-view.component';
import { PurchaseEditComponent } from './pages/purchase-edit/purchase-edit.component';
import { InvoicePrintComponent } from './pages/invoice-print/invoice-print.component';
import { PurchasePrintComponent } from './pages/purchase-print/purchase-print.component';
import { CustomerRecieptEntryComponent } from './pages/customer-reciept-entry/customer-reciept-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    InvoiceEntryComponent,
    InvoiceViewComponent,
    InvoiceEditComponent,
    ProductEntryComponent,
    ProductViewComponent,
    ProductEditComponent,
    StockEditComponent,
    StockEntryComponent,
    StockViewComponent,
    StockReportComponent,
    CustomerEntryComponent,
    CustomerEditComponent,
    CustomerViewComponent,
    CustomerRecieptComponent,
    SupplierRecieptComponent,
    ChangePasswordComponent,
    PurchaseEntryComponent,
    PurchaseViewComponent,
    PurchaseEditComponent,
    InvoicePrintComponent,
    PurchasePrintComponent,
    CustomerRecieptEntryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
