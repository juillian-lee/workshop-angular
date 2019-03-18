import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProejetoStoreService } from 'src/app/store/projeto/projeto-store.service';
import { Observable } from 'rxjs';
import { Projeto } from 'src/app/store/projeto/projeto';
import Swal from 'sweetalert2';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html'
})
export class ProjetosComponent implements OnInit {

  projetos$: Observable<Projeto[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private projetoStoreService: ProejetoStoreService,
    
  ) { }

  ngOnInit() {
    this.projetoStoreService.dispatchListProjetoAction();
    this.projetos$ = this.projetoStoreService.getProjetos();
    this.isLoading$ = this.projetoStoreService.getIsLoading();
  }

  onClickDeletar(projeto: Projeto) {
    Swal.fire({
      title: `Deletar o projeto ${projeto.nome}`,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: () => {
        this.projetoStoreService.dispatchDeleteProjetoAction(projeto);
        const promise = this.projetoStoreService.getIsLoadingDelete().toPromise();
        return Promise.all([promise]);
      }
    }).then(result => {
      Swal.fire({
        title: 'Projeto deletado com sucesso',
        type: 'success'
      });
    })
  }


}
