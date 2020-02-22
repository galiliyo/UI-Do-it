import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { InplaceModule } from 'primeng/inplace';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [],
  imports: [
    ToolbarModule,
    InplaceModule,
    PasswordModule,
    FormsModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
  ],
  exports: [
    ToolbarModule,
    InplaceModule,
    PasswordModule,
    FormsModule,
    ButtonModule,
    AppRoutingModule,
    CardModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
  ],
})
export class SharedModule {}
