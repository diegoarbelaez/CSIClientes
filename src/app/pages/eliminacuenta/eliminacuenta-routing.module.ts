import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminacuentaPage } from './eliminacuenta.page';

const routes: Routes = [
  {
    path: '',
    component: EliminacuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminacuentaPageRoutingModule {}
