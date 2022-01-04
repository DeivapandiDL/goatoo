import { Component,OnInit, Input, Output,EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppserviceService } from '../../services/appservice.service'; 
import swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-child-product',
  templateUrl: './child-product.component.html',
  styleUrls: ['./child-product.component.scss'],
})
export class ChildProductComponent implements OnInit {

   @Input('childToMaster') products: any;
   userDetailsAuth:any = {};
   userLogin:boolean = false;
  @Output() childToParent = new EventEmitter<String>();
  constructor(private router:Router,private cookieService:CookieService,private appService:AppserviceService,) { 
    this.getUserAuth();
  }
  countBoolean:boolean = false;
  productId:string = "";
cartNumber:number = 0;
getProductStoreCount:any = [];
tempcount:any = [];
tempNO:number = 0;

  ngOnInit() {
    console.log(this.products.productImage);
    this.getImageLoad(this.products.productImage);
    let productCount = JSON.parse(sessionStorage.getItem("getProductCount"));
    if(productCount){
      this.getProductStoreCount = productCount;  
      this.getUpdateProductCount();
      }
  }


  getUpdateProductCount(){
    this.countBoolean = false;
    if(this.getProductStoreCount.length > 0){
      this.getProductStoreCount.forEach(data => {
        if(data.productId == this.products.productID){
         this.cartNumber = data.count;
        }
       });
       if(this.cartNumber != 0){
        this.countBoolean = true;
       }
     }
  }

  getUserAuth(){
    let obj = this.cookieService.get('userDetails');
    if(obj){ 
    this.userDetailsAuth = JSON.parse(obj);
    if(Object.keys(this.userDetailsAuth).length > 0){
      this.userLogin = true;
    }
  }
  }

  sendToParent(name){
    this.childToParent.emit(name);
  }

  addWishlist(id){
    if(!this.userLogin){
      console.log(id);
      swal({
        title: "Login Necessary",
        type: 'warning',
        showConfirmButton: true,
        showCancelButton: false    
      })
      .then((willDelete) => {
      });
      return;
    }
    else{
      let obj = {
        productID:id,
        customerID:this.userDetailsAuth.id
      }
      this.appService.postWishlist(obj).subscribe(data => {
        console.log(data);
        this.getWishlist();
      })
  
    } 
  }
  
  deleteWishlist(id){
    this.appService.deleteWishlist(id).subscribe(data => {
      if(data){
        if(data == true){
          this.getWishlist();
        }
      }
      
    })
  }
getWishlistData:any = [];
getWishlist(){
  this.appService.getWishlist(this.userDetailsAuth.id).subscribe(data =>{
    console.log(data);
    this.getWishlistData = data;
    this.products.wishlist = false;
    this.getWishlistData.forEach(wish => {
    if((this.products.productID == wish.productID) && (wish.customerID == this.userDetailsAuth.id)){
      this.products.wishlist = true;
      console.log(this.products);
    }
    })
  })
}



gotoProductDesc(name,id){
  let product = {'id':id, 'name':name}
  this.appService.product = product;
  sessionStorage.setItem("productData",JSON.stringify(product));
  this.router.navigate(['home/product-details'], { queryParams: { id: id}});
}
imagePreview:string = '';
getImageLoad(id){
  this.appService.getProductImage(id).subscribe(data =>{
    console.log(data);
this.imagePreview = data[0].path;

  })
}


addToCartBtn(id){
this.countClick(1,id);  
this.countBoolean = false;
}


countClick(nos,id){
  this.tempNO = this.tempNO + 1;
  console.log(this.tempNO);
  if(nos == 0){ 
    if(this.cartNumber > 1){
      this.cartNumber = this.cartNumber - 1;
    }
    else if(this.cartNumber == 1){
      this.cartNumber = 0;
      this.countBoolean = false;
    }
  }
  else if(nos == 1){
    this.cartNumber = this.cartNumber + 1;
  }
  this.addToCart(id);
}

addToCart(id){
if(this.getProductStoreCount.filter((value, index) => { return value.productId === id}).length > 0) {
  this.getProductStoreCount.forEach((data,index) =>{
    if(data.productId == id){
      if(this.cartNumber != 0){ 
        data.count = this.cartNumber;
      }
      else{
        this.getProductStoreCount.splice(index,1);
      }
    }
  });
} 
else {
  this.getProductStoreCount.push({'count':this.cartNumber,'productId':this.products.productID});
}
console.log(this.getProductStoreCount);
sessionStorage.setItem("getProductCount",JSON.stringify(this.getProductStoreCount));
}

}
