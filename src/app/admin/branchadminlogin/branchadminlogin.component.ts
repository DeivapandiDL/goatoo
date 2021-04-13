import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { AppserviceService } from '../../services/appservice.service'; 
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { Router, RouterModule, Routes,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-branchadminlogin',
  templateUrl: './branchadminlogin.component.html',
  styleUrls: ['./branchadminlogin.component.scss'],
})
export class BranchadminloginComponent implements OnInit {
  loginSignUp:number = 0;
  registerForm: FormGroup;
  loginForm: FormGroup;
  submitted = false;
  loginSubmitted = false;
  postData = {
    name: ''    };
    customer:any={};
    constructor(private router:Router,private cookieService:CookieService,private http:HttpClient,private formBuilder: FormBuilder,private appService:AppserviceService) {
        this.getUserAuth();
    }
    getUserAuth(){
        let obj = this.cookieService.get('userDetails');
        console.log(obj);
        if(obj){ 
        this.router.navigate(['home']);
        }
      
      }
  
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
        username:['',Validators.required],
        password:['',Validators.required]
    })
  
    }
    
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
           
          this.appService.checkBranchAdmin(this.loginForm.value).subscribe(data => {
              if(data){
                  this.loginCredentials = data;
                  debugger;
                  if(this.loginCredentials.length > 0){
                      this.appService.userAuth(this.loginCredentials[0]);
                      this.cookieService.set('userDetails',JSON.stringify(this.loginCredentials[0]));
                       this.router.navigate(['/admin/AdminProductList']);
                  }
                  else{
                      this.loginBoolean = true;
                  }
              }
          })
        
       }
  
      
       
      
  
  
  
  
  
  
  }
