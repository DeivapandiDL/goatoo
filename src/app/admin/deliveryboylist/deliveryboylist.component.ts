import { Component, OnInit,ViewChild } from '@angular/core';
import { AppserviceService } from 'src/app/services/appservice.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-deliveryboylist',
  templateUrl: './deliveryboylist.component.html',
  styleUrls: ['./deliveryboylist.component.scss'],
})
export class DeliveryboylistComponent implements OnInit {
  displayedColumns = ["firstname", "email", "phonenumber", "alternatenumber", "age", "gender", "education", "aadhar","profile","id"];
  dataSource: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private appService:AppserviceService) { }
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

}

export interface UserData {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  alternatenumber: string;
  age: string;
  gender: string;
  education: string;
  aadhar: string;
  profile: string;
}
