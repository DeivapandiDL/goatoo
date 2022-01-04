import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CommonModule } from '@angular/common';  
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from '../app/search-pipe/filter.pipe';
// import { ClickOutsideDirective } from 'src/app/outsideclick.directive';
import { AppserviceService } from 'src/app/services/appservice.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './shared/menu/menu.component';
import { LocationComponent } from './shared/location/location.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [AppComponent,MenuComponent,FilterPipe,FooterComponent,LocationComponent
    // ClickOutsideDirective
  ],
  entryComponents: [LocationComponent],
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    BrowserModule,CommonModule, IonicModule.forRoot(), 
    AppRoutingModule,ReactiveFormsModule,FormsModule,HttpClientModule, 
    NoopAnimationsModule
   ],
  providers: [
    StatusBar,
    SplashScreen,
    AppserviceService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
