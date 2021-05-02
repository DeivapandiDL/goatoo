import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestPage } from './test.page';
import { MaptestComponent } from "./maptest/maptest.component";
const routes: Routes = [
  {
    path: '',
    component: TestPage
  },
  {
    path: 'map',
    component: MaptestComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestPageRoutingModule {}
