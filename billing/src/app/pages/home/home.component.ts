import { Component, OnInit } from '@angular/core';
import { BillService } from '../../bill.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private obj:BillService,private route:Router){}

  ngOnInit(): void {
    if(localStorage.getItem("aid") == null){
      this.route.navigate(["/login"]);
    }
  }
  
}
