import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageCroppedEvent, base64ToFile,ImageCropperComponent, CropperPosition} from 'ngx-image-cropper';
import { AppserviceService } from 'src/app/services/appservice.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-branch-admin',
  templateUrl: './branch-admin.component.html',
  styleUrls: ['./branch-admin.component.scss'],
})
export class BranchAdminComponent implements OnInit {
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
existBoolean:boolean = false;
id:any;
  constructor(private formBuilder: FormBuilder,private router:Router,private http:HttpClient, private appservice:AppserviceService) { }
  password;
  show:boolean = false;
  ngOnInit() {
    this.password = 'password';
    this.location();
      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,Validators.minLength(8)]],
        phonenumber: ['', [Validators.required, Validators.minLength(10)]],
        alternatenumber: ['', [Validators.required, Validators.minLength(10)]],
        branchname: ['', Validators.required],
        address: ['', Validators.required],
        gender: ['', Validators.required],
        aadhar: ['', Validators.required],
        profile: ['', Validators.required],
        location: ['', Validators.required],
        status:["", Validators.required]
      });
  }
  getLocation:any = [];

  location(){
    this.appservice.location().subscribe(data =>{
      console.log(data);
      this.getLocation = data;
    })
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
       this.appservice.createBranchAdmin(this.registerForm.value).subscribe(data => {
        console.log('deliveryboy values',this.registerForm.value);
        if(data){
          alert(data);
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
}

onClick() {
  if (this.password === 'password') {
    this.password = 'text';
    this.show = true;
  } else {
    this.password = 'password';
    this.show = false;
  }
}




imageProfileCropped(event: ImageCroppedEvent) {
  this.croppedProfileImage = event.base64;
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




  branchAdminExist(nos){
    this.existBoolean = false;
if(nos.length >= 10){
  this.appservice.branchAdminExist(nos).subscribe(data =>{
    console.log(data);
    if(data[0]){
      if(data[0].phonenumber && data[0].phonenumber != ''){
        this.existBoolean = true;

        setTimeout(() =>{
          this.existBoolean = false;
          this.registerForm.controls['phonenumber'].setValue('');
        },2000)
      }
    }
  });
}
  }



}