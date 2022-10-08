import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgentesPageRoutingModule } from './agentes-routing.module';

import { AgentesPage } from './agentes.page';


// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgentesPageRoutingModule
  ],
  declarations: [AgentesPage]
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgentesPageModule {}
