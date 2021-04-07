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
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminPage } from './admin.page';
// import { BrowserModule } from '@angular/platform-browser';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { CookieService } from 'ngx-cookie-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ChartsModule } from 'ng2-charts';
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
    AngularMyDatePickerModule,
    ImageCropperModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    ChartsModule,
    MatSlideToggleModule
  ],
  declarations: [
    AdminPage,
    AdminProductComponent,
    AdminProductListComponent,
    DeliveryBoyComponent,
    DeliveryboylistComponent,
    BranchAdminComponent,
    BranchadminlistComponent,
    EditDeliveryboyComponent,
    BranchadmineditComponent,
    FilterPipe,
    CreateCategoryComponent,
    EditproductComponent,
    MailerComponent,
    CreateSubCategoryComponent,
    PurchasedListComponent,
    DashboardComponent,
    CustomerListComponent],
  providers: [CookieService]
})
export class AdminPageModule {}