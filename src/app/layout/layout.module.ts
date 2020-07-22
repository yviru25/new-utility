import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { AppHeaderComponent } from '../shared/app-header/app-header.component';
import { AppFooterComponent } from '../shared/app-footer/app-footer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LayoutComponent, AppHeaderComponent, AppFooterComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
