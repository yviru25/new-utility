import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AisL2Component } from './ais-l2.component';

const routes: Routes = [
    {
      path: '',
      component: AisL2Component
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AisL2RoutingModule { }
