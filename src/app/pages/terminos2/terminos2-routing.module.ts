import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Terminos2Page } from './terminos2.page';

const routes: Routes = [
  {
    path: '',
    component: Terminos2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Terminos2PageRoutingModule {}
