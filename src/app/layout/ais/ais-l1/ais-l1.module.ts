import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AisL1RoutingModule } from './ais-l1-routing.module';
import { AisL1Component } from './ais-l1.component';

@NgModule({
  declarations: [AisL1Component],
  imports: [
    CommonModule,
    AisL1RoutingModule
  ]
})
export class AisL1Module { }
