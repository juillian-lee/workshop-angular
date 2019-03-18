import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { AppStoreModule } from './store/app-store.module';

import { LayoutComponent } from './pages/layout/layout.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorRequest } from './shared/http-interceptor-request';
import { AuthStoreModule } from './store/auth/auth-store.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppStoreModule,
    AuthStoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
