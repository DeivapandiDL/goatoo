import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { IonicModule } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { ProductsPageRoutingModule } from './products-routing.module';
import { ProductsPage } from './products.page';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component'; 
import { OrderSuccessComponent } from './order-success/order-success.component';
import {OrderHistoryComponent } from './order-history/order-history.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ChildProductComponent } from './child-product/child-product.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    MatToolbarModule,
    MatTooltipModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDCRrAVmMLdTb8aiqiXNtBWmXClbXXTtM8'
    })
  ],
  declarations: [ProductsPage,
    ProductDetailsComponent,
    HomeComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    FilterPipe,
    OrderHistoryComponent,
    WishlistComponent,
    ChildProductComponent
  ],
  providers:[CookieService]
})
export class ProductsPageModule {}
