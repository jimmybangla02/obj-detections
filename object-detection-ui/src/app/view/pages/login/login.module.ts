import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {ClrCheckboxModule, ClrInputModule, ClrPasswordModule, ClrSelectModule} from "@clr/angular";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [
    CommonModule,
    ClrSelectModule,
    FormsModule,
    ClrPasswordModule,
    ClrCheckboxModule,
    ClrInputModule
  ]
})
export class LoginModule { }
