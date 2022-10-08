import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoSeguraPageRoutingModule } from './info-segura-routing.module';

import { InfoSeguraPage } from './info-segura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoSeguraPageRoutingModule
  ],
  declarations: [InfoSeguraPage]
})
export class InfoSeguraPageModule {}
