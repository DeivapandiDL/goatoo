import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-delivery-orders',
  templateUrl: './delivery-orders.component.html',
  styleUrls: ['./delivery-orders.component.scss'],
})
export class DeliveryOrdersComponent implements OnInit {
  userDetailsAuth:any = {};
  constructor(private cookieService:CookieService,private router:Router) {
    this.getUserAuth();
   }
  getUserAuth(){
    let obj = this.cookieService.get('userDetails');
    if(obj){ 
    this.userDetailsAuth = JSON.parse(obj);
    console.log(this.userDetailsAuth);
    if(Object.keys(this.userDetailsAuth).length > 0){
      if(this.userDetailsAuth.role != 3){
        swal({
          text: "You are not authorized to access this page",
          type: 'warning'
        })
        this.router.navigate(['admin/mydelivery-orders'])
      }
    }
    else{
      this.router.navigate(['/home'])
    }
  }
  else{
    this.router.navigate(['/home'])
  }
  }
  ngOnInit() {}

}
