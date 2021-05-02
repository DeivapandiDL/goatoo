import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestPageRoutingModule } from './test-routing.module';

import { TestPage } from './test.page';
import {MaptestComponent} from "./maptest/maptest.component"
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBvOV5R1RPcNivTYpq4lJ0GYSgvqmg9hHc',
      libraries: ["places"],
      apiVersion: 'quarterly'
    }),
    
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBvOV5R1RPcNivTYpq4lJ0GYSgvqmg9hHc'
    // }),
    AgmJsMarkerClustererModule
    
  ],
  declarations: [TestPage,MaptestComponent]
})
export class TestPageModule {}
