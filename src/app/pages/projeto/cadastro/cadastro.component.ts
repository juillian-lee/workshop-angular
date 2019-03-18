import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProejetoStoreService } from 'src/app/store/projeto/projeto-store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  form: FormGroup;

  isLoading$: Observable<boolean>

  constructor(
    private fb: FormBuilder,
    private projetoServiceStore: ProejetoStoreService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit() {

    this.isLoading$ = this.projetoServiceStore.getIsLoading();

    this.form = this.fb.group({
      id: [null],
      nome: [''],
      valor: [''],
      descricao: [''],
      quitado: [false]
    });

    let message = 'Projeto cadastrado com sucesso';

    const id = this.route.snapshot.params.id;
    if(!!id) {
      message = 'Projeto atualizado com sucesso';
      this.projetoServiceStore.dispatchGetProjetoAction(id);
      this.projetoServiceStore.getProjeto().subscribe(projeto => {
        this.form.patchValue(projeto);
      });
    }

    this.projetoServiceStore.getIsProjetoCreatedUpdated().subscribe(_ => {
      Swal.fire({
        title: message,
        type: 'success'
      }).then(_ => {
        this.projetoServiceStore.dispatchCreateUpdateProjetoResetAction();
        this.router.navigate(['/']);
      })
    })

  }

  onSubmit() {
    const form = this.form.value;
    this.projetoServiceStore.dispatchCreateUpdateProjetoAction({
      id: form.id,
      nome: form.nome,
      valor: form.valor,
      quitado: form.quitado,
      descricao: form.descricao
    });
  }

}
