import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from '../../../nav.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
    standalone: false
})
export class SidebarComponent {
  user: string|any;

  constructor(private router:Router,private nav:NavService){ }

  ngOnInit(): void {
    this.nav.currentLogin.subscribe((res)=>{
      this.user=res;
    });
  }

  logout(){
    localStorage.removeItem("aid");
    localStorage.removeItem("aname");
    this.router.navigate(["/login"]);
    this.nav.updateLogin("login");
  }
}
