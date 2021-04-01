import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    MatToolbarModule,
    MatTooltipModule,
    
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
