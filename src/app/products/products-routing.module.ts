import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsPage } from './products.page';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'product-list',
    component:ProductsPage
  },
  {
    path:'product-details',
    component: ProductDetailsComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent
  },
  {
    path:'order-success',
    component:OrderSuccessComponent
  },
  {
    path:'order-history',
    component:OrderHistoryComponent
  },
  {
    path:'wishlist',
    component:WishlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}
