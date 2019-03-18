import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetoRoutingModule } from './projeto-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjetoStoreModule } from 'src/app/store/projeto/projeto-store.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CadastroComponent, ProjetosComponent],
  imports: [
    SharedModule,
    ProjetoRoutingModule,
    ProjetoStoreModule,
    ReactiveFormsModule
  ]
})
export class ProjetoModule { }
