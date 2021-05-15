import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageCroppedEvent, base64ToFile,ImageCropperComponent, CropperPosition} from 'ngx-image-cropper';
import { AppserviceService } from 'src/app/services/appservice.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delivery-boy',
  templateUrl: './delivery-boy.component.html',
  styleUrls: ['./delivery-boy.component.scss'],
})
export class DeliveryBoyComponent implements OnInit {
  registerForm: FormGroup;
    submitted = false;
    imageChangedEvent: any = '';
    imageChangedProfileEvent: any = '';
    croppedImage: any = '';
    croppedProfileImage:any = '';
    cropperHeight: any = ''; cropperWidth: any = '';
  getCropper:Blob;
  lastCroppedImage: any;
  lastCropperPosition: CropperPosition;
    constructor(private formBuilder: FormBuilder,private router:Router,private http:HttpClient, private appservice:AppserviceService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
          firstname: ['', Validators.required],
          lastname: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          phonenumber: ['', [Validators.required, Validators.minLength(10)]],
          alternatenumber: ['', [Validators.required, Validators.minLength(10)]],
          location:['',Validators.required],
          age: ['', Validators.required],
          gender: ['', Validators.required],
          education: ['', Validators.required],
          aadhar: ['', Validators.required],
          profile: ['', Validators.required],
          acceptTerms: [false, Validators.requiredTrue]
        });
        this.location();
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        console.log(this.registerForm.value);
        this.registerForm.value.aadhar = this.croppedImage;
        this.registerForm.value.profile = this.croppedProfileImage;
         this.appservice.createDeliveryBoy(this.registerForm.value).subscribe(data => {
          console.log('deliveryboy values',this.registerForm.value);
          if(data){
            this.router.navigate(['home']);
          }
          
      })


    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

    fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }

  fileChangeProfileEvent(event: any): void {
    this.imageChangedProfileEvent = event;
}


  fileUpload:any;
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      // console.log(this.croppedImage);
  }

  


  imageProfileCropped(event: ImageCroppedEvent) {
    this.croppedProfileImage = event.base64;
     console.log(this.croppedProfileImage);
}


  imageLoaded(image: HTMLImageElement) {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
emptyObj:any = {};
phoneBoolean:boolean = false;
  deliveryboyExist(event){
    if(event.target.value.length >= 10){ 
    console.log(event.target.value);
    this.appservice.deliveryboyExist(event.target.value).subscribe(data =>{
      if(data){
        this.emptyObj = data;
        if(Object.keys(this.emptyObj).length > 0){
          console.log(this.emptyObj);
          this.phoneBoolean = true;

          setTimeout(() =>{
            this.phoneBoolean = false;
            this.emptyObj = {}
            this.registerForm.controls['phonenumber'].setValue("");
          },2000)
        }
      }
    })
    }
  }
  getLocation:any = [];

  location(){
    this.appservice.location().subscribe(data =>{
      console.log(data);
      this.getLocation = data;
    })
  }


  }