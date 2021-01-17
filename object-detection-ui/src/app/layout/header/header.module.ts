import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {ClrIconModule} from '@clr/angular';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    ClrIconModule,
    RouterModule
  ]
})
export class HeaderModule { }
