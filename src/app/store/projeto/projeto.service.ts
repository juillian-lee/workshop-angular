import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Projeto } from './projeto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class ProjetoService {

    private api_projetos = `${environment.api}/projetos`;

    constructor(
        private http: HttpClient
    ){}

    findAll(): Observable<any> {
        return this.http.get(this.api_projetos);
    }

    create(projeto: Projeto) {
        return this.http.post(this.api_projetos, projeto);
    }


    update(projeto: Projeto) {
        return this.http.put(this.api_projetos, projeto);
    }

    delete(projetoId: number) {
        return this.http.delete(`${this.api_projetos}/${projetoId}`);
    }

    get(projetoId: number) {
        return this.http.get(`${this.api_projetos}/${projetoId}`);
    }
}