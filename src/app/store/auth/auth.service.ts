import { Injectable } from "@angular/core";
import { Observable, empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface RegisterRequestPayload {
    nome: string;
    email: string;
    password: string;
}


@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient
    ) {}
    
    signIn(email: string, password: string): Observable<any> {
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);
        formData.append('grant_type', 'password');
        return this.http.post(`${environment.api}/oauth/token`, formData, {
            headers: {
                'Authorization': `Basic ${environment.clientId}`
            }
        });
    }
}