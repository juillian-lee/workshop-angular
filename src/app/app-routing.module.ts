import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from 'src/app/pages/auth/auth.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { ProjetoModule } from './pages/projeto/projeto.module';



const routes: Routes = [
  {
    path:  '',
    component: LayoutComponent,
    children: [
      {path: '', loadChildren: () => ProjetoModule}
    ]
  },
  {path: 'login', loadChildren: () => AuthModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
