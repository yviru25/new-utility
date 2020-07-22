import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AisL2RoutingModule } from './ais-l2-routing.module';
import { AisL2Component } from './ais-l2.component';

@NgModule({
  declarations: [AisL2Component],
  imports: [
    CommonModule,
    AisL2RoutingModule
  ]
})
export class AisL2Module { }
