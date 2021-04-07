import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { AppserviceService } from '../services/appservice.service'; 
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  list:string = 'grid';
  userDetailsAuth:any = {};
  // master : String="send from parent";
  // childToParent(name){
  //   this.master=name;
  // }
  locId:string = '';
  constructor(private cookieService:CookieService,private appService:AppserviceService,private router:Router) {
    let locId = this.cookieService.get('location');
    if(locId){
      let loc = JSON.parse(locId);
      this.locId = loc.id;
    }
    this.getUserAuth();
   }
   userLogin:boolean = false;
   getUserAuth(){
    let obj = JSON.parse(this.cookieService.get('userDetails'));
    if(obj){ 
    this.userDetailsAuth = obj;
    if(Object.keys(this.userDetailsAuth).length > 0){
      this.userLogin = true;
    }
  }
  }
  menuId:any = {};
  menuName:string = "";
  productList:any = [];
  count:number = 0;
  tempcount:any = [];
  cartIDNo:number = 0;
  productListData:any = [];
  ngOnInit() {
    this.appService.menuChange.subscribe(menu => {
      console.log(menu);
      this.subCatList = [];
    this.productList = [];
    this.menuId = menu;
    this.getCategoryProduct();
    this.getSubCategory();
    });
    this.getCategoryProduct();
    this.getProducts();
    this.getSubCategory();
  }

  
     
  

  view(list){
    this.list = list;
  }
  priceSort(event){
    console.log(event.target.value);
    if(event.target.value != '' && event.target.value == 'low'){ 
      this.productList.forEach(subcat => {
      subcat.product.sort((a, b) =>  parseFloat(a.productRate) - parseFloat(b.productRate));
      });
    }
    if(event.target.value != '' && event.target.value == 'high'){ 
      this.productList.forEach(subcat => {
      subcat.product.sort((a, b) =>  parseFloat(b.productRate) - parseFloat(a.productRate));
      });
    }
  }
  getProducts(){
    this.appService.getProductList().subscribe((data) => {
        if(data){
          this.productListData = data;
        }
    });
}

cartNumber:number = 1;
productArr:any = {};
subCatList:any = [];
productLoadTrue:boolean = false;
getSubCategory(){
  this.subCatList = [];
  if(Object.keys(this.menuId).length > 0){ 
    this.menuName = this.menuId.name;
  }
  else{
    this.menuId = JSON.parse(sessionStorage.getItem("productMenu"));
  }
  setTimeout(() =>{
  this.appService.getSubCategorybyCatId(this.menuId.id).subscribe(data => {
    console.log('sub category details:::',data);
    this.subCatList=data;
  })
})
}

  getCategoryProduct(){
    if(Object.keys(this.menuId).length > 0){ 
      this.menuName = this.menuId.name;
    }
    else{
      this.menuId = JSON.parse(sessionStorage.getItem("productMenu"));
    }
    setTimeout(() =>{
    this.getAllProductByCat();
  });
  }

  getAllProductByCat(){
    this.productList = [];
  this.appService.getCategoryProduct(this.menuId.id).subscribe(data =>{
    console.log(data);
    this.productList = data;
    this.productLoadTrue = true;
  })
}



  subcatSetID:number = 0;
  subcatSetIDBoolean:boolean = true;
  
  getAll(id){
    this.subcatSetID = id;
    this.getAllProductByCat()
  }

getProductBySubId(id){ 
  this.subcatSetID = id;
  this.productList = [];
  this.productLoadTrue = false;
  this.appService.getRelatedProducts(id).subscribe(res =>{
    console.log(res);
    setTimeout(()=>{
      this.productList = res;
      this.productLoadTrue = true;
      this.ngOnInit();
    })
    
  });
}
}
