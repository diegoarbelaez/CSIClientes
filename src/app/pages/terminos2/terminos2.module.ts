import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Terminos2PageRoutingModule } from './terminos2-routing.module';

import { Terminos2Page } from './terminos2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Terminos2PageRoutingModule
  ],
  declarations: [Terminos2Page]
})
export class Terminos2PageModule {}
