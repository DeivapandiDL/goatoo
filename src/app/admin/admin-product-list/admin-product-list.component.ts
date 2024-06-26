import { Component, OnInit,ViewChild } from '@angular/core';
import { AppserviceService } from 'src/app/services/appservice.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss'],
})
export class AdminProductListComponent implements OnInit {

  displayedColumns = ["productName", "productDescription","quantity","productRate","createdDate","expiryDate","activate","productID"];
  dataSource: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cookieService:CookieService,private appService: AppserviceService,private router:Router) { }
  getProducts:any = [];
  myFlagForSlideToggle:boolean = false;
  ngOnInit() {
    this.getProductList();
  }

  getProductList(){
    this.appService.getProductList().subscribe(data =>{
      if(data){
        this.getProducts = data;
        this.dataSource = new MatTableDataSource(this.getProducts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.getProducts);
      }
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  changeStatus(status,id){
    console.log(status);

    let data = {
      status:null,
      productID:id
    }
    if(status == true){
      data.status = 0
    }
    else if(status == false){
      data.status = 1
    }    
    this.appService.changeProductStatus(data).subscribe(data =>{
      console.log(data);
      this.getProductList();
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
deleteId:number;
deletedProductName:string;
DeleteProduct(id,name){ 
  this.deleteId = id;
  this.deletedProductName = name;
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    type: 'warning',
    showConfirmButton: true,
    showCancelButton: true     
  })
  .then((willDelete) => {
      if(willDelete.value){
           this.deleteproductApp();
      }else{
        
      }
    console.log(willDelete)
  });
}

deleteproductApp(){
  this.appService.deleteproduct(this.deleteId).subscribe(data => {
    console.log(data);
    if(Object.keys(data).length > 0) { 
      swal("You have deleted "+this.deletedProductName);
      this.refreshProduct();
    }
  })
}



refreshProduct(){
  this.deletedProductName = "";
  this.deleteId = 0;
  setTimeout(() =>{
    this.getProductList();
  },1000);
}

EditProduct(id){
this.appService.adminProductId = id;
setTimeout(() => {
  this.router.navigate(['/admin/EditProduct']);
},100);

}
}
