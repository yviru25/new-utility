import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AisComponent } from './ais.component';
import { AISRoutingModule } from './ais.routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AisComponent],
  imports: [
    CommonModule,
    AISRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AisModule { }
