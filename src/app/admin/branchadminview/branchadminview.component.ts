import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-branchadminview',
  templateUrl: './branchadminview.component.html',
  styleUrls: ['./branchadminview.component.scss'],
})
export class BranchadminviewComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<BranchadminviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
      console.log(this.data);
    }
  
    closePopup(data){
      this.dialogRef.close();
    }

}
