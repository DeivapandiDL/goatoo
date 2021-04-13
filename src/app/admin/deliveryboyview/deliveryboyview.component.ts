import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-deliveryboyview',
  templateUrl: './deliveryboyview.component.html',
  styleUrls: ['./deliveryboyview.component.scss'],
})
export class DeliveryboyviewComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeliveryboyviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
      console.log(this.data);
    }
  
    closePopup(data){
      this.dialogRef.close();
    }

}
