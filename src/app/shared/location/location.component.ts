import { Component, OnInit,Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {

  constructor( private cookieService:CookieService,public dialogRef: MatDialogRef<LocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
  }

  getLoc(data){
    console.log(data);
    this.cookieService.set('location',JSON.stringify(data));
    this.dialogRef.close(data);
  }
}
