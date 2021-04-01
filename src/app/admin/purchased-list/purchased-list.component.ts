import { Component, OnInit } from '@angular/core';
import { AppserviceService } from 'src/app/services/appservice.service';
@Component({
  selector: 'app-purchased-list',
  templateUrl: './purchased-list.component.html',
  styleUrls: ['./purchased-list.component.scss'],
})
export class PurchasedListComponent implements OnInit {

  constructor(private appService:AppserviceService) { }


  

  ngOnInit() {
    this.getCustomerProductList();
    let courseArray=[
      {"id":1,
      "name":"javascript",
      },
      {"id":2,
      "name":"typescript",
      }
      ,{"id":11,
      "name":"angular",
      },{"id":1,
      "name":"javascript",
      },{"id":1,
      "name":"javascript",
      },{"id":1,
      "name":"javascript",
      },{"id":1,
      "name":"javascript",
      },{"id":1,
      "name":"javascript",
      },{"id":1,
      "name":"javascript",
      },{"id":1,
      "name":"javascript",
      },{"id":1,
      "name":"javascript",
      }
    ]
    var filterArray = courseArray.reduce((accumalator, current) => {
      if(!accumalator.some(item => item.id === current.id && item.name === current.name)) {
        accumalator.push(current);
      }
      return accumalator;
  },[]);
  console.log(filterArray)
  }


  getCustomerProductList(){
    // this.appService.getCustomerProduct().subscribe(data =>{

    // })
  }

}
