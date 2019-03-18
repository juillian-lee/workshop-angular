import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthStoreModule } from 'src/app/store/auth/auth-store.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    AuthRoutingModule,
    AuthStoreModule,
    SharedModule
  ]
})
export class AuthModule { }
