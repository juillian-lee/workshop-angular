import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorRequest } from './http-interceptor-request';
import { AuthStoreModule } from '../store/auth/auth-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthStoreModule
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ]
})
export class SharedModule { }
