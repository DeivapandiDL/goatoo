import { Component, OnInit,ViewChild } from '@angular/core';
import { AppserviceService } from 'src/app/services/appservice.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryboyviewComponent } from '../deliveryboyview/deliveryboyview.component';


@Component({
  selector: 'app-deliveryboylist',
  templateUrl: './deliveryboylist.component.html',
  styleUrls: ['./deliveryboylist.component.scss'],
})
export class DeliveryboylistComponent implements OnInit {
  displayedColumns = ["firstname", "phonenumber", "alternatenumber", "aadhar","profile","id"];
  dataSource: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,private appService:AppserviceService) { }
  List:any = [];
  ngOnInit() {
    this.getDeliveryBoyList();
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

  deleteDeliveryBoy(id){}

  activate(id){
    this.List.forEach(data =>{
      if(data.id == id){
        console.log(data);
      }
    });

// this.appService.activateDeliveryBoy(id).subscribe(data =>{
//   console.log(data);
// })


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
    this.appService.changeDeliveryBoyStatus(data).subscribe(data =>{
      console.log(data);
      this.getDeliveryBoyList();
    })
  }




  getDeliveryBoyList(){
    this.appService.getDeliveryBoyList().subscribe(data =>{
      if(data){
        this.List = data;
        console.log(this.List);
        this.dataSource = new MatTableDataSource(this.List);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  viewdetails(id){
    let data = [];
    this.List.forEach(item =>{
      if(item.id == id){
        data.push(item);
      }
    });
    console.log(data);
    let dialogRef = this.dialog.open(DeliveryboyviewComponent, {
      width: "800px",
      data: data[0] ? data[0] : {},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }



}

