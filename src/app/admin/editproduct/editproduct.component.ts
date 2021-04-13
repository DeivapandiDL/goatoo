import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppserviceService } from 'src/app/services/appservice.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ImageCroppedEvent, base64ToFile,ImageCropperComponent, CropperPosition} from 'ngx-image-cropper';
import swal from 'sweetalert2';
import { ProductImageComponent } from '../product-image/product-image.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss'],
})
export class EditproductComponent {
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

  ionViewWillEnter() {
    if(this.appservice.adminProductId != ''){
      console.log(this.appservice.adminProductId);
      this.getProductEdit(this.appservice.adminProductId);
    }

    this.registerProduct = this.formBuilder.group({
      productName: ['', Validators.required],
      categoryID : ['', Validators.required],
      subcategoryID: ['', Validators.required],
      productCount: ['', Validators.required],
      productImage: [''],
      productDescription: ['', Validators.required],
      productRateSymbol: ['', Validators.required],
      productRate: ['', Validators.required],
      productOfferPercent: ['', Validators.required],
      
  });
  this.getCategoryList();
  this.getSubCategory();
  }
  
  editProductBoolean:boolean = false;
  getProductEdit(id){
    this.appservice.getProductDetails(id).subscribe(data =>{
      console.log(data);
      if(data){ 
      this.getProduct = data[0];
      console.log('product id',this.getProduct);
      // this.croppedImage = this.getProduct.productImage ? this.getProduct.productImage : '';
      this.editProductBoolean = true;
      this.getImageLoad();
      }
    })
  }
  imagePreview:string = "";
  getImageLoad(){
    console.log(this.getProduct.productImage);
    this.appservice.getProductImage(this.getProduct.productImage).subscribe(data =>{
      console.log(data);
      if(data){
       this.imagePreview = data[0].path; 
      }
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
    console.log(event);
    this.subCatList.forEach(element => {
      if(event==element.catID){
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
      this.catSelect(this.getProduct.categoryID);
  })

  }

  fileToUpload: any;
  imageUrl: any;



     get f() { return this.registerProduct.controls; }
 




   

     pdtSubmit() {
         this.submitted = true;
 
         // stop here if form is invalid
         if (this.registerProduct.invalid) {
             return;
         } 
         this.appservice.editProduct(this.getProduct).subscribe(data => {
          console.log('product details:::',data);
          if(data == 'true'){
            swal({
              title: "Product Updated Successfully",
              type: 'success',
              showConfirmButton: true,
              showCancelButton: false    
            })
            .then((willDelete) => {
              this.router.navigate(['admin/AdminProductList']);
            });
            
          }
          
      })
      this.onReset();
     }
 
     onReset() {
         this.submitted = false;
         this.registerProduct.reset();
     }


     imageId:number = null;
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
      this.getProduct.productImage = data[0].id;
    })
  });
}
}

