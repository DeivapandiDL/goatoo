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

  ngOnInit() {}

  getUserAuth(){
    let obj = JSON.parse(this.cookieService.get('userDetails'));
    if(obj){ 
    this.userDetailsAuth = obj;
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
  this.router.navigate(['home/product-details'], { queryParams: { name: name}});
}

}
