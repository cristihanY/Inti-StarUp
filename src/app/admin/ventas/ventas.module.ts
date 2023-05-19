import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { SharedModule } from './../../shared/shared.module';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasgComponent } from './components/ventasg/ventasg.component';
import { VentasgEditComponent } from './components/ventasg-edit/ventasg-edit.component';


@NgModule({
  declarations: [VentasgComponent, VentasgEditComponent],
  imports: [
    CommonModule,
    VentasRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class VentasModule { }
