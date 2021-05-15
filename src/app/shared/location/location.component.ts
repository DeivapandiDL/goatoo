import { Component, OnInit,Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppserviceService } from 'src/app/services/appservice.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {

  constructor( private appService:AppserviceService,private cookieService:CookieService,public dialogRef: MatDialogRef<LocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    loc:string= '';
  ngOnInit() {
    this.appService.castLocation.subscribe(loc => this.loc = loc);
    console.log(this.data);
  }

  getLoc(data){
    console.log(data);
    this.cookieService.set('location',JSON.stringify(data));
    this.appService.editLocation(data.id);
    this.dialogRef.close(data);
  }
}
