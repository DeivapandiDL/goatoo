import { Component, OnInit,ViewChild } from '@angular/core';
import { AppserviceService } from 'src/app/services/appservice.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-branchadminlist',
  templateUrl: './branchadminlist.component.html',
  styleUrls: ['./branchadminlist.component.scss'],
})
export class BranchadminlistComponent {
  displayedColumns = ["name", "email","phonenumber","alternatenumber","branchname","address","gender","aadhar","profile","location","id"];
  dataSource: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private appService:AppserviceService,private router:Router) { }
  List:any = [];
  ionViewWillEnter() {
    this.getBranchAdminList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  deleteBranchAdmin(id){}

 

// this.appService.activateDeliveryBoy(id).subscribe(data =>{
//   console.log(data);
// })


  

  getBranchAdminList(){
    this.appService.getBranchAdminList().subscribe(data =>{
      if(data){
        this.List = data;
        console.log(this.List);
        this.dataSource = new MatTableDataSource(this.List);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
  editBranchAdmin(id){ 
  this.router.navigate(['/admin/editbranchadmin', id]);
  }

}

export interface UserData {
id:string;
name:string;
email:string;
phonenumber:string;
alternatenumber:string;
branchname:string;
address:string;
gender:string;
aadhar:string;
profile:string;
location:string;
}
