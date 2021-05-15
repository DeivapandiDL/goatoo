import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../../services/appservice.service'; 
import { Router,NavigationEnd,ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  previousUrl:string;
  constructor(private cookieService:CookieService,private appService:AppserviceService,private router:Router,private activatedRoute: ActivatedRoute) {
    router.events
  .pipe(filter(event => event instanceof NavigationEnd))
  .subscribe((event: NavigationEnd) => {
    console.log('prev:', event.url);
    this.previousUrl = event.url;
  });
  this.getUserAuth();
   }
  getProduct:any = {};
productId:string = "";
getProductList:any = [];
cartNumber:number = 1;
getProductStoreCount:any = [];
userDetailsAuth:any = {};
tempcount:any = [];
tempNO:number = 0;
productArr:any = [];
userLogin:boolean = false;
menuId:string = "";
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.menuId = params.id;
      console.log(this.menuId);
      this.getProductDetails(this.menuId);
    });
    let productCount = JSON.parse(sessionStorage.getItem("getProductCount"));
    if(productCount){
    this.getProductStoreCount = productCount;  
    }
    
  }

  getUserAuth(){
    let obj = this.cookieService.get('userDetails');
    if(obj){ 
    this.userDetailsAuth = JSON.parse(obj);
    console.log(this.userDetailsAuth);
    if(Object.keys(this.userDetailsAuth).length > 0){
      this.userLogin = true;
    }
  }
  }





  numberOnly(event):boolean{
    const charCode=event.which ? event.which : event.keyCode;
    if(charCode > 31 && (charCode < 48 || charCode > 57)){
      return false;
    }
    return true;
  }
  widthContainer:any;
  getSliderInterval:any;
  myStartFunction(){
    this.getSliderInterval = setInterval(() =>{
      this.getSliderPrev(1)
    },6000)
  }
  
  myStopFunction() {
    clearInterval(this.getSliderInterval);
    console.log("mouse enter detected");
  }


  marginDataSet:any = {};
tempcountSlider:number = 0;
sliderWidthSet:number = 280;
tempTrans:number;
getSliderPrev(nos){
if(nos == 1){
  if(this.tempcountSlider <= this.relatedProduct.length - 5){
    this.tempcountSlider = this.tempcountSlider + 1;
    this.tempTrans = this.tempcountSlider * this.sliderWidthSet;
    this.marginDataSet = {
      '-ms-transform': 'translateX(-'+this.tempTrans+'px)',
    'transform': 'translateX(-'+this.tempTrans+'px)'
    };
  }
  else{
      this.marginDataSet = {
       '-ms-transform': 'translateX(0px)',
      'transform': 'translateX(0px)'
      };
      this.tempcountSlider = 0;
  }
}
else if (nos == 0){
  if(this.tempcountSlider > 0){
    this.tempTrans = this.tempTrans - this.sliderWidthSet;
    this.tempcountSlider = this.tempcountSlider - 1;
    this.marginDataSet = {
      '-ms-transform': 'translateX(-'+this.tempTrans+'px)',
    'transform': 'translateX(-'+this.tempTrans+'px)'
    };
  }
}
}


relatedProduct:any = [];
  getProductDetails(id){
    this.appService.getProductDetails(id).subscribe(data =>{
      console.log(data);
      this.getProductList = data[0];
      this.getImageLoad(this.getProductList.productImage);
      if(this.getProductStoreCount.length > 0){
       this.getProductStoreCount.forEach(data => {
         if(data.productId == this.getProductList.productID){
          this.cartNumber = data.count;
         }
        });
      }
      // this.productArr.push({'count':this.cartNumber,'productId':this.getProductList.productID});
      this.appService.getRelatedProducts(this.getProductList.subcategoryID).subscribe(res =>{
        console.log(res)
        if(res){ 
        this.relatedProduct = res;
        this.widthContainer = this.relatedProduct.length * 300;
        this.getSliderInterval = setInterval(() =>{
          this.getSliderPrev(1)
        },6000);
        this.relatedProductWishlist();
        }
      })
    })
  }
  imagePreview:string = "";
  getImageLoad(id){
    this.appService.getProductImage(id).subscribe(data =>{
      this.imagePreview = data[0].path;
    })
  }

  countClick(nos){
    this.productArr = [];
    this.tempNO = this.tempNO + 1;
    console.log(this.tempNO);
    if(nos == 0){ 
      if(this.cartNumber > 1){
        this.cartNumber = this.cartNumber - 1;
      }
    }
    else if(nos == 1){
      this.cartNumber = this.cartNumber + 1;
    }
}

addToCart(id,cartNumber){
  if(this.getProductStoreCount.filter((value, index) => { return value.productId === id}).length > 0) {
    this.getProductStoreCount.forEach(data =>{
      if(data.productId == id){
        data.count = this.cartNumber;
      }
    });
  } 
  else {
    this.getProductStoreCount.push({'count':this.cartNumber,'productId':this.getProductList.productID});
  }
  console.log(this.getProductStoreCount);
  sessionStorage.setItem("getProductCount",JSON.stringify(this.getProductStoreCount));
}

  



getWishlistData:any = [];
getWishlist(){
  this.appService.getWishlist(this.userDetailsAuth.id).subscribe(data =>{
    console.log("data wishlist");
    console.log(data);
    this.getWishlistData = data;
    this.getProductList.wishlist = false;
        this.getWishlistData.forEach(wish =>{
        if((this.getProductList.productID == wish.productID) && (wish.customerID == this.userDetailsAuth.id)){
          this.getProductList.wishlist = true;
          console.log(this.getProductList);
        }
  });
  })
}


getrelatedproductwishlist:any = [];
relatedProductWishlist(){
  this.appService.getWishlist(this.userDetailsAuth.id).subscribe(data =>{
    console.log("data wishlist");
    console.log(data);
    this.getWishlistData = data;
    this.relatedProduct.forEach(product => {
      product.wishlist = false;
        this.getWishlistData.forEach(wish =>{
        if((product.productID == wish.productID) && (wish.customerID == this.userDetailsAuth.id)){
          product.wishlist = true;
          console.log(this.getProductList);
        }
  });
})
  })
}


addWishlist(id,nos){
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
      if(nos == 1){
        this.getWishlist();
        }
        else if(nos == 0){
          this.relatedProductWishlist();
          }
    })

  } 
}

deleteWishlist(id,nos){
  this.appService.deleteWishlist(id).subscribe(data => {
    if(data){
      if(data == true){
        console.log(data);
        if(nos == 1){
        this.getWishlist();
        }
        else if(nos == 0){
          this.relatedProductWishlist();
          }
      }
    }
    
  })
}



}
