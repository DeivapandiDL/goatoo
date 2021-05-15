import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { AppserviceService } from '../services/appservice.service'; 
import { Router,ActivatedRoute } from '@angular/router';
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
  locId:string = '';
  BulkProductBoolean:boolean = false;
  constructor(private cookieService:CookieService,private appService:AppserviceService,private router:Router,private activatedRoute: ActivatedRoute) {
    this.getUserAuth();  
  }
   userLogin:boolean = false;
   getUserAuth(){
    let obj = this.cookieService.get('userDetails');
    if(obj){ 
    this.userDetailsAuth = JSON.parse(obj);
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

  ngOnInit() {
    this.appService.castLocation.subscribe(loc => this.locId = loc);
    let locId = this.cookieService.get('location');
    if(locId){
      let loc = JSON.parse(locId);
      this.locId = loc.id;
    }
    if(this.locId != ''){ 
    this.activatedRoute.queryParams.subscribe(params => {
      this.menuId = params.id;
      this.getAll(0)
      this.getSubCategory();
    });
  }
  }

  view(list){
    this.list = list;
  }

  priceSort(event){
    console.log(event.target.value);
    if(event.target.value != '' && event.target.value == 'low'){ 
      if(this.productList.length > 0){ 
        this.productList.forEach(subcat => {
        subcat.product.sort((a, b) =>  parseFloat(a.productRate) - parseFloat(b.productRate));
        });
      }
      if(this.getProductbySubcatList.length > 0){ 
          this.getProductbySubcatList.sort((a, b) =>  parseFloat(a.productRate) - parseFloat(b.productRate));
      }
    }
    if(event.target.value != '' && event.target.value == 'high'){ 
      if(this.productList.length > 0){
        this.productList.forEach(subcat => {
          subcat.product.sort((a, b) =>  parseFloat(b.productRate) - parseFloat(a.productRate));
        });
      }
      if(this.getProductbySubcatList.length > 0){
        this.getProductbySubcatList.sort((a, b) =>  parseFloat(b.productRate) - parseFloat(a.productRate));
      }
    }
  }


cartNumber:number = 1;
productArr:any = {};
subCatList:any = [];
productLoadTrue:boolean = false;



getSubCategory(){
  this.appService.getSubCategorybyCatId(this.menuId).subscribe(data => {
    console.log('sub category details:::',data);
    this.subCatList=data;
})
}

  getCategoryProduct(id){
    this.productList = [];
  this.appService.getCategoryProduct(this.menuId).subscribe(data =>{
    console.log(data);
    this.getProductbySubcatList = [];
    this.productList = data;
    this.productLoadTrue = true;
  })
}



  subcatSetID:number = 0;
  subcatSetIDBoolean:boolean = true;
  
  getAll(id){
    this.BulkProductBoolean = true;
    this.subcatSetID = id;
    this.getCategoryProduct(this.menuId)
  }
getProductbySubcatList:any = [];
getProductBySubId(id){ 
  this.subcatSetID = id;
  this.productList = [];
  this.productLoadTrue = false;
  this.BulkProductBoolean = false;
  this.appService.getProductBySubCategory(id).subscribe(res =>{
    console.log(res);
    setTimeout(()=>{
      this.getProductbySubcatList = res;
      console.log(this.getProductbySubcatList);
    });
  });
}
}
