import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { AppserviceService } from 'src/app/services/appservice.service'; 
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { Router, RouterModule, Routes,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-deliveryboylogin',
  templateUrl: './deliveryboylogin.component.html',
  styleUrls: ['./deliveryboylogin.component.scss'],
})
export class DeliveryboyloginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginSubmitted = false;
  errorBoolean:boolean = false;
  postData = {
    name: ''    };
    customer:any={};
    userDetailsAuth:any = {};
  constructor(private router:Router,private cookieService:CookieService,private http:HttpClient,private formBuilder: FormBuilder,private appService:AppserviceService) {
    this.getUserAuth();
    this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        console.log(event.url);
      });
   }


   getUserAuth(){
    let obj = this.cookieService.get('userDetails');
    if(obj){ 
    this.userDetailsAuth = JSON.parse(obj);
    this.router.navigate(['home']);
    console.log(this.userDetailsAuth);
    }
  
  }


  ngOnInit() {
  this.loginForm = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
  })

  }
  
     // convenience getter for easy access to form fields
     get l() { return this.loginForm.controls;}
     loginBoolean:boolean=false;
     loginCredentials:any = [];
     onLoginSubmit(){
        this.loginSubmitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        console.log(JSON.stringify(this.loginForm.value));
        var count=0;
         this.errorBoolean = false;
        this.appService.checkDeliveryBoy(this.loginForm.value).subscribe(data => {
            if(data){
                this.loginCredentials = data;
                if(this.loginCredentials.length > 0){
                    this.appService.userAuth(this.loginCredentials[0]);
                    console.log(this.loginCredentials[0]);
                    this.cookieService.set('userDetails',JSON.stringify(this.loginCredentials[0]));
                    this.router.navigate(['/admin/mydelivery-orders']);
                }
                else{
                    this.loginBoolean = true;
                }
            }
            else{
              this.errorBoolean = true;
            }
        });
     }

    


}

