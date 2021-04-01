import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageCroppedEvent, base64ToFile,ImageCropperComponent, CropperPosition} from 'ngx-image-cropper';
import { AppserviceService } from 'src/app/services/appservice.service';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-branchadminedit',
  templateUrl: './branchadminedit.component.html',
  styleUrls: ['./branchadminedit.component.scss'],
})
export class BranchadmineditComponent implements OnInit {
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
  id:any ='';
  branchAdmin:any = {};
  constructor(private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute,private router:Router,private http:HttpClient, private appservice:AppserviceService) { }
  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.id != ''){
      this.getbranchadmin(this.id)
    }
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
        location: ['', Validators.required]
      });
  }


  getbranchadmin(id){
this.appservice.getbranchadmin(id).subscribe(data =>{
  console.log(data);
  if(data){ 
  this.branchAdmin = data[0]
  }
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

emptyObj:any = {};
phoneBoolean:boolean = false;
branchAdminExist(event){
    if(event.target.value.length >= 10){ 
    console.log(event.target.value);
    this.appservice.branchAdminExist(event.target.value).subscribe(data =>{
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



}