import { Component, OnInit,ViewChild } from '@angular/core';
import { AppserviceService } from 'src/app/services/appservice.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { BranchadminviewComponent } from '../branchadminview/branchadminview.component';
@Component({
  selector: 'app-branchadminlist',
  templateUrl: './branchadminlist.component.html',
  styleUrls: ['./branchadminlist.component.scss'],
})
export class BranchadminlistComponent {
  // "phonenumber","alternatenumber",
  displayedColumns = ["name","branchname","profile","location","id"];
  dataSource: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,private appService:AppserviceService,private router:Router) { 
    
  }
  List:any = [];
  ionViewWillEnter() {
    this.getBranchAdminList();
    this.location();
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

  viewdetails(id){
    let data = [];
    this.List.forEach(item =>{
      if(item.id == id){
        data.push(item);
      }
    });
    console.log(data);
    let dialogRef = this.dialog.open(BranchadminviewComponent, {
      width: "800px",
      data: data[0] ? data[0] : {},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
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
    this.appService.changeBranchAdminStatus(data).subscribe(data =>{
      console.log(data);
      this.getBranchAdminList();
    })
  }
  getLocation:any = [];
  location(){
    this.appService.location().subscribe(data =>{
      console.log(data);
      this.getLocation = data;
    })
  }



}


