import { Component, OnInit } from '@angular/core';
import { AppserviceService } from 'src/app/services/appservice.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-branchadmin-pwd',
  templateUrl: './branchadmin-pwd.component.html',
  styleUrls: ['./branchadmin-pwd.component.scss'],
})
export class BranchadminPwdComponent implements OnInit {

  constructor(private appservice:AppserviceService,) { }
  emptyBoolean:boolean=false;
  email:string="";

  ngOnInit() {
    var val = Math.floor(1000 + Math.random() * 9000);
console.log(val);

  }
  sendEmail(){
    this.emptyBoolean=false;
    if(this.email==""){
      this.emptyBoolean=true;
    }
    else{
      this.branchadminPwd();
    }
  }
  branchadminPwd(){
    this.appservice.branchadminPwd('email').subscribe(data=>{
      console.log(data);
    })
  }

}
