import { Component, OnInit } from '@angular/core';
import { AppserviceService } from 'src/app/services/appservice.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-deliveryboy-pwd',
  templateUrl: './deliveryboy-pwd.component.html',
  styleUrls: ['./deliveryboy-pwd.component.scss'],
})
export class DeliveryboyPwdComponent implements OnInit {

  constructor(private appservice:AppserviceService,) { }
  emptyBoolean:boolean=false;
  email:string="";

  ngOnInit() {
        

  }


  
  sendEmail(){
    this.emptyBoolean=false;
    if(this.email==""){
      this.emptyBoolean=true;
    }
    else{
      this.deliveryboyPwd();
    }
  }
  deliveryboyPwd(){
    
    this.appservice.deliveryboyPwd(this.email).subscribe(data=>{
      console.log(data);
      if(data[0]){
     
      }
    })
  }

}
