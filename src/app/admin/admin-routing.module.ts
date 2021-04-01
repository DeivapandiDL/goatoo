import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminProductListComponent } from './admin-product-list/admin-product-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateSubCategoryComponent } from './create-sub-category/create-sub-category.component';
import { PurchasedListComponent } from './purchased-list/purchased-list.component';
import { DeliveryBoyComponent } from './delivery-boy/delivery-boy.component';
import { DeliveryboylistComponent } from './deliveryboylist/deliveryboylist.component';
import { BranchAdminComponent } from './branch-admin/branch-admin.component';
import { BranchadminlistComponent } from './branchadminlist/branchadminlist.component';
import { BranchadmineditComponent } from './branchadminedit/branchadminedit.component';
import { EditDeliveryboyComponent } from './edit-deliveryboy/edit-deliveryboy.component';
const routes: Routes = [
  {
    path: '',
    component: AdminPage,
  },
  {
    path:'createcategory',
    component:CreateCategoryComponent
  },
  {
    path:'createsubcategory',
    component:CreateSubCategoryComponent
  },
  {
    path: 'addProduct',
    component: AdminProductComponent,
  },
  {
    path: 'AdminProductList',
    component: AdminProductListComponent
  },
  {
    path:'customer-list',
    component:CustomerListComponent
  },
  {
    path: 'EditProduct',
    component: EditproductComponent
  },
  {
    path:'PurchasedList',
    component: PurchasedListComponent
  },
  {
    path:'career',
    component:DeliveryBoyComponent
  },
  {
    path:'deliveryboylist',
    component:DeliveryboylistComponent
  },
  {
    path:'createBranchAdmin',
    component:BranchAdminComponent
  },
  {
    path:'branchAdminList',
    component:BranchadminlistComponent
  },
  {
    path:'editdeliveryboy',
    component:EditDeliveryboyComponent
  },
  {
    path:'editbranchadmin/:id',
    component:BranchadmineditComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
