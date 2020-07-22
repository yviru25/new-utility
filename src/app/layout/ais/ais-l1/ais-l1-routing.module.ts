import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AisL1Component } from './ais-l1.component';

const routes: Routes = [
       {
           path: '',
           component: AisL1Component
       }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AisL1RoutingModule { }
