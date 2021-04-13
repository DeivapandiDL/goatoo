import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppserviceService } from 'src/app/services/appservice.service';
import { Router } from '@angular/router';
import { ImageCroppedEvent, base64ToFile,ImageCropperComponent, CropperPosition} from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';
import { ProductImageComponent } from '../product-image/product-image.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements OnInit {
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd-mm-yyyy'
    // other options are here...
  };

  myDateInit: boolean = true;
  model: IMyDateModel = null;
  registerProduct: FormGroup;
  submitted = false;
  getProduct:any = {};
  uploadedFiles: Array < File > ;
  constructor(public dialog: MatDialog,private cookieService:CookieService,private formBuilder: FormBuilder,private router:Router,private http:HttpClient, private appservice:AppserviceService) { }
  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperHeight: any = ''; cropperWidth: any = '';
getCropper:Blob;
lastCroppedImage: any;
lastCropperPosition: CropperPosition;

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  fileUpload:any;
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      console.log(this.croppedImage);
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
  
  
  minDate:Date = new Date();

  ngOnInit() {
    if (this.myDateInit) {
       
    }
    else {
        // Initialize to today with javascript date object
        this.model = {isRange: false, singleDate: {jsDate: new Date()}};
    }
    if(this.appservice.adminProductId != ''){
      this.getProductEdit(this.appservice.adminProductId);
    }

    this.registerProduct = this.formBuilder.group({
      productName: ['', Validators.required],
      categoryID : ['', Validators.required],
      subcategoryID: ['', Validators.required],
      productCount: ['', Validators.required],
      productWeight: ['', Validators.required],
      productImage: ['', Validators.required],
      productDescription: ['', Validators.required],
      productRateSymbol: ['', Validators.required],
      productRate: ['', Validators.required],
      expiryDate:['',Validators.required],
      productOfferPercent: ['', Validators.required],
      status: ['', Validators.required],
      location:['', Validators.required],
      // image:['']
      
  });

  this.location();
  this.getCategoryList();
  this.getSubCategory();
  }
getLocation:any = [];

  location(){
    this.appservice.location().subscribe(data =>{
      console.log(data);
      this.getLocation = data;
    })
  }

  getProductEdit(id){
    this.appservice.getProductDetails(id).subscribe(data =>{
      console.log(data);
      this.getProduct = data[0];
    })
  }

numberOnly(event):boolean{
  const charCode=event.which ? event.which : event.keyCode;
  if(charCode > 31 && (charCode < 48 || charCode > 57)){
    return false;
  }
  return true;
}
textOnly(event){
  return(
    (event.charCode > 64 && event.charCode <91) ||
    (event.charCode > 96 && event.charCode <123)
  )   
}

  catList:any=[];
  subCatList:any=[];
  subTemp:any=[];
  subTempBoolean:boolean=true;
  getCategoryList(){
    this.appservice.getCategoryList().subscribe(data => {
      console.log('category details:::',data);
      this.catList=data;
  })

  }

  catSelect(event){
    this.subTemp=[];
    this.subTempBoolean=true;
    console.log(event.target.value);
    this.subCatList.forEach(element => {
      if(event.target.value==element.catID){
        this.subTemp.push(element);
      }
    });
    if(this.subTemp.length>0){
      this.subTempBoolean=false;
    }
    
  }
  getSubCategory(){
    this.appservice.getSubCategory().subscribe(data => {
      console.log('category details:::',data);
      this.subCatList=data;
  })

  }

  fileToUpload: any;
  imageUrl: string = "";


  getImageupload(){
    console.log(this.croppedImage);
    // this.appservice.productImageUpload(this.croppedImage).subscribe(data => {
    //   console.log(data);
    // });
  }


     get f() { return this.registerProduct.controls; }
     fileChange(element, file: FileList) {

      this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      console.log(this.imageUrl);
    }
    reader.readAsDataURL(this.fileToUpload);
      this.uploadedFiles = element.target.files;
      console.log('file upload',this.uploadedFiles);
    
  }





     pdtSubmit() {
         this.submitted = true;
         // stop here if form is invalid
         if (this.registerProduct.invalid) {
             return;
         } 
         // display form values on success
        //  this.registerProduct.value.productImage='';
         
         this.registerProduct.value.expiryDate = this.registerProduct.value.expiryDate.singleDate.jsDate;
         this.appservice.getAddProductDetails(this.registerProduct.value).subscribe(data => {
          console.log('product details:::',data);
          console.log('product values',this.registerProduct.value);
          if(data == 'true'){
            this.router.navigate(['admin/AdminProductList']);
          }
          
      })
      this.onReset();
     }
 
     createNewCategory(){
      this.router.navigate(['admin/createcategory']);
     }

     createNewSubCategory(){
      this.router.navigate(['admin/createsubcategory']);
     }




     onReset() {
         this.submitted = false;
         this.registerProduct.reset();
     }


     
imageId:number = null;
imagePreview:string = '';
productImageUpload(){
  let dialogRef = this.dialog.open(ProductImageComponent, {
    width: "800px",
    height:"400px",
    data: this.imageId,
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    this.imageId = result;
    this.appservice.getProductImage(this.imageId).subscribe(data =>{
      console.log(data);
  this.imagePreview = data[0].path;
  this.registerProduct.value.productImage = data[0].id;
    })
  });
}


}
