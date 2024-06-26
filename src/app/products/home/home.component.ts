import { Component, OnInit, ViewChild,ElementRef,Input, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { AppserviceService } from 'src/app/services/appservice.service';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert2';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  
  registerForm: FormGroup;
  submitted = false;
  datas:any = [1,2,3,4,5,6,7,8,9,10]
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  sliderBanner:any = [];
  getProductCount:any = [];
  productArr:any = {};
  tempcount:any [];
  count:number = 0;
  userDetailsAuth:any = {};
  userLogin:boolean = false;
  purchaseProduct:any = [];
  

// google maps zoom level
zoom: number = 8;
  
// initial center position for the map
lat: number = 51.673858;
lng: number = 7.815982;
minClusterSize = 50;

clickedMarker(label: string, index: number) {
  console.log(`clicked the marker: ${label || index}`)
}

mapClicked($event: MouseEvent) {
  this.markers.push({
    lat: $event.coords.lat,
    lng: $event.coords.lng,
    // lat: 51.673858,
    // lng: 7.815982,
    draggable: true
  });

}

markerDragEnd(m: marker, $event: MouseEvent) {
  console.log('dragEnd', m, $event);
}

markers: marker[] = [
  {
    lat: 51.673858,
    lng: 7.815982,
    label: 'A',
    draggable: true
  },
  {
    lat: 51.373858,
    lng: 7.215982,
    label: 'B',
    draggable: false
  },
  {
    lat: 51.723858,
    lng: 7.895982,
    label: 'C',
    draggable: true
  },
  // repeat
    {
    lat: 51.673800,
    lng: 7.815900,
    label: 'A',
    draggable: true
  },
  {
    lat: 51.373858,
    lng: 7.215982,
    label: 'B',
    draggable: false
  },
  {
    lat: 51.723858,
    lng: 7.895982,
    label: 'C',
    draggable: true
  }
]

toggleCluster(){ 
this.minClusterSize = (this.minClusterSize<5)?50:2;
console.log('toggleCluster  minClusterSize = '+this.minClusterSize);
}





  adminDropdown:boolean = false;
  locId:string = '';
  @ViewChild("sliderWidth", { static: false }) sliderWidth: ElementRef;
  constructor(private cookieService: CookieService, private formBuilder: FormBuilder, private appService: AppserviceService, private router:Router) {
    
    let pr = JSON.parse(sessionStorage.getItem("getProductCount"));
    this.getUserAuth();
    if(pr){ 
    this.getProductCount = pr;
    }
   }
   getUserAuth(){
    let obj = this.cookieService.get('userDetails');
    if(obj){ 
    this.userDetailsAuth = JSON.parse(obj);
    console.log(this.userDetailsAuth);
    if(Object.keys(this.userDetailsAuth).length > 0){
      this.userLogin = true;
      if(this.userDetailsAuth.role == 3){
        this.router.navigate(['admin/mydelivery-orders'])
      }
      this.getCustomerProduct();
    }
    if(this.userDetailsAuth.role==1){
      this.adminDropdown=true;
      console.log(this.userDetailsAuth.role);
    }
  }
  }
  getCustomerProduct(){
    let id = this.userDetailsAuth.id ? this.userDetailsAuth.id: '';
    this.appService.getCustomerProduct(id).subscribe(data =>{
      if(data){
        this.purchaseProduct = data;
        console.log(this.purchaseProduct);
        this.widthContainer = this.purchaseProduct.length * 280;
        this.getSliderInterval = setInterval(() =>{
          this.getSliderPrev(1)
        },6000)
      }
    })  
  }


  ionViewWillEnter() {
    this.appService.castLocation.subscribe(loc => this.locId = loc);
    let locId = this.cookieService.get('location');
    if(locId){
      let loc = JSON.parse(locId);
      this.locId = loc.id;
    }
      this.appService.productCountChange.subscribe(count => {
      this.tempcount = [];
      if(Object.keys(count).length > 0){ 
      if(this.getProductCount.length > 0){
       this.tempcount = this.getProductCount.filter(data => {return data.productId == count.productId});
       console.log(this.tempcount);
       if(this.tempcount.length == 0){
         this.getProductCount.push(count);
       }
       else if(this.tempcount.length > 0){
         this.getProductCount.forEach(element => {
           if(element.productId == this.tempcount[0].productId){
             element.count = count.count;
           }
         });
       }
       
      }
      else if(this.getProductCount.length == 0){
        this.getProductCount.push(count);
      }
      console.log(this.getProductCount);
      this.count = this.getProductCount.map(a => a.count).reduce(function(a, b)
        {
          return a + b;
        });
        console.log(this.count);
      }
      this.tempcount = [];
      });
    this.getProducts();
    this.getUserDetails();

    
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
  if(this.tempcountSlider <= this.purchaseProduct.length - 4){
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






productList:any = [];


getProducts(){
    this.appService.getProducts().subscribe((data) => {
        if(data){
          this.productList = data;
          console.log(this.productList);
          this.getProductQuantity();
          this.getWishlist();
        }
        this.getBannerSlider();
    });
}

getUserDetails(){
    this.appService.getList().subscribe((data) => {
        console.log(data);
    });
}
getBannerSlider(){
        this.sliderBanner =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 1,
          caption:"Welcome to SPKFARMS"
        },
        {
          id: 2,
          caption:"Welcome to SPKFARMS"
        },
        {
          id: 3,
          caption:"Welcome to SPKFARMS"
        },
        {
          id: 4,
          caption:"Welcome to SPKFARMS"
        }
      ]
    };
}

//Move to Next slide
slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,    
    autoplay: 2000
  };

  


//pdt seperate display 
gotoProductDesc(name,id){
  let product = {'id':id, 'name':name}
  this.appService.product = product;
  sessionStorage.setItem("productData",JSON.stringify(product));
  this.router.navigate(['products/product-details']);
}


// product quantity add or remove
getProductQuantity(){
  if(this.getProductCount.length > 0){ 
    this.productList.forEach(cat => {
      cat.subcategory.forEach(subcat => {
      subcat.product.forEach(product =>{
        product.quantityBool = false;
        product.quantity = 0;
          this.getProductCount.forEach(prcount => {
            if(product.productID == prcount.productId && prcount.count > 0){
              product.quantityBool = true;
              product.quantity = prcount.count;
            }
          });
    });
  });
    });
  }
}

countClick(prid,count,nos){
  this.productArr = {};
  if(nos == 0){ 
  // if(count > 1){
    count = count - 1;
  // }
}
else if(nos == 1){
  count = count + 1;
}
this.productArr = {'count':count,'productId':prid};
this.addToCartToCheckout();
}





addToCartToCheckout(){
  this.appService.changeCount(this.productArr);
   sessionStorage.setItem("getProductCount",JSON.stringify(this.getProductCount));
   this.getProductQuantity();
}


openCount(prId){
  this.productList.forEach(cat => {
    cat.subcategory.forEach(subcat => {
    subcat.product.forEach(product =>{
      if(product.productID == prId){
        product.quantityBool = true;
        this.countClick(product.productID,product.quantity,1);
      }
    });
  })
  });
}
getWishlistData:any = [];
getWishlist(){
  this.appService.getWishlist(this.userDetailsAuth.id).subscribe(data =>{
    console.log("data wishlist");
    console.log(data);
    this.getWishlistData = data;
    this.productList.forEach(cat => {
      cat.subcategory.forEach(subcat => {
      subcat.product.forEach(product =>{
        product.wishlist = false;
        this.getWishlistData.forEach(wish =>{
        if((product.productID == wish.productID) && (wish.customerID == this.userDetailsAuth.id)){
          product.wishlist = true;
          console.log(product);
        }
      });
      });
    });
  });
  })
}








}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}