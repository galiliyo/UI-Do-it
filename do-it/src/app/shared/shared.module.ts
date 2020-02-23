import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { InplaceModule } from 'primeng/inplace';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
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
    ProgressSpinnerModule,
  ],
  exports: [
    ToolbarModule,
    InplaceModule,
    PasswordModule,
    FormsModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    ProgressSpinnerModule,
  ],
})
export class SharedModule {}
