import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppserviceService } from 'src/app/services/appservice.service';
import { ImageCroppedEvent, base64ToFile,ImageCropperComponent, CropperPosition} from 'ngx-image-cropper';
import swal from 'sweetalert2';
@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss'],
})
export class ProductImageComponent implements OnInit {

  constructor(private appservice: AppserviceService,public dialogRef: MatDialogRef<ProductImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    imageChangedEvent: any = '';
  productCroppedImage: any = '';
  cropperHeight: any = ''; cropperWidth: any = '';
getCropper:Blob;
lastproductCroppedImage: any;
uploadedFiles: Array < File > ;
lastCropperPosition: CropperPosition;
selectImageId:number = null;
  fileProductChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  fileUpload:any;
  imageCropped(event: ImageCroppedEvent) {
      this.productCroppedImage = event.base64;
      console.log(this.productCroppedImage);
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
    productImageList:any = [];
    ngOnInit() {
      this.getProductImage()
    }

    getProductImage(){
      this.appservice.productimage().subscribe(data =>{
        console.log(data);
        this.productImageList = data;
        this.productImageList = this.productImageList.reverse();
        this.tab(0);
      })
    }
    fileToUpload: any;
    imageUrl: string = "";
    
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

  getImageId(id){
    this.selectImageId = id;
  }

  getImage(){
    if(this.selectImageId != null){ 
      this.dialogRef.close(this.selectImageId);
    }
    else{
      swal("Please select Image");
    }
    }
    tabNo:number = null;
    tab(nos){
      this.tabNo = nos;
      if(this.tabNo == 1){
        this.selectImageId = null;
      }
    }
 
    addNewImage(){ 
      if(this.productCroppedImage != ''){ 
      let data = {
        path : this.productCroppedImage
      }
      this.appservice.insertProductImage(data).subscribe(data =>{
        console.log(data);
        if(data){
          this.productCroppedImage = '';
          this.getProductImage();
        }
      })
    }
    else if(this.productCroppedImage == ''){
      swal("Please select Image");
    }
    }

}
