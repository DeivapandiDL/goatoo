import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FilterPipe } from './filter.pipe';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AdminPageRoutingModule } from './admin-routing.module';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminProductListComponent } from './admin-product-list/admin-product-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateSubCategoryComponent } from './create-sub-category/create-sub-category.component';
import { PurchasedListComponent } from './purchased-list/purchased-list.component';
import { MailerComponent } from './mailer/mailer.component';
import { DeliveryBoyComponent } from './delivery-boy/delivery-boy.component';
import { DeliveryboylistComponent } from './deliveryboylist/deliveryboylist.component';
import { BranchAdminComponent } from './branch-admin/branch-admin.component';
import { BranchadminlistComponent } from './branchadminlist/branchadminlist.component';
import { EditDeliveryboyComponent } from './edit-deliveryboy/edit-deliveryboy.component';
import { BranchadmineditComponent } from './branchadminedit/branchadminedit.component';
import { DeliveryboyviewComponent } from './deliveryboyview/deliveryboyview.component';
import { BranchadminviewComponent } from './branchadminview/branchadminview.component';
import { DeliveryboyPwdComponent } from './deliveryboy-pwd/deliveryboy-pwd.component';
import { DeliveryboyloginComponent } from './deliveryboylogin/deliveryboylogin.component';
import { DeliveryOrdersComponent } from './delivery-orders/delivery-orders.component';
import {BranchadminPwdComponent } from "./branchadmin-pwd/branchadmin-pwd.component";
import { BranchadminloginComponent } from "./branchadminlogin/branchadminlogin.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminPage } from './admin.page';
import { ProductImageComponent } from '../admin/product-image/product-image.component';
// import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ChartsModule } from 'ng2-charts';
import { MatDialogModule } from '@angular/material/dialog';
import { from } from 'rxjs';
@NgModule({
  imports: [
    // BrowserModule,
    MatToolbarModule,
    MatTooltipModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    ChartsModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  entryComponents: [DeliveryboyviewComponent,BranchadminviewComponent,ProductImageComponent],
  declarations: [
    AdminPage,
    AdminProductComponent,
    AdminProductListComponent,
    DeliveryBoyComponent,
    DeliveryboylistComponent,
    DeliveryboyviewComponent,
    BranchAdminComponent,
    BranchadminviewComponent,
    BranchadminlistComponent,
    EditDeliveryboyComponent,
    BranchadmineditComponent,
    DeliveryboyPwdComponent,
    DeliveryboyloginComponent,
    DeliveryOrdersComponent,
    BranchadminPwdComponent,
    BranchadminloginComponent,
    FilterPipe,
    CreateCategoryComponent,
    EditproductComponent,
    MailerComponent,
    CreateSubCategoryComponent,
    PurchasedListComponent,
    DashboardComponent,
    ProductImageComponent,
    CustomerListComponent],
  providers: [CookieService]
})
export class AdminPageModule {}