import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminacuentaPageRoutingModule } from './eliminacuenta-routing.module';

import { EliminacuentaPage } from './eliminacuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminacuentaPageRoutingModule
  ],
  declarations: [EliminacuentaPage]
})
export class EliminacuentaPageModule {}
