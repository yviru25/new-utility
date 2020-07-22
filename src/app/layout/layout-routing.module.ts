import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'dashboard/ais',
                loadChildren: './ais/ais.module#AisModule'
            },
            {
                path: 'dashboard/ais-l1',
                loadChildren: './ais/ais-l1/ais-l1.module#AisL1Module'
            },
            {
                path: 'dashboard/ais-l2',
                loadChildren: './ais/ais-l2/ais-l2.module#AisL2Module'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
