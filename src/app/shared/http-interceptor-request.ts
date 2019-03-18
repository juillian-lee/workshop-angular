import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, empty, combineLatest } from 'rxjs';
import { AuthStoreService } from '../store/auth/auth-store.service';
import { mergeMap, catchError, take, switchMap } from 'rxjs/operators';
import { error } from 'util';
import Swal from 'sweetalert2';


@Injectable()
export class HttpInterceptorRequest implements HttpInterceptor {
    constructor(
        private authStoreService: AuthStoreService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const combRef = combineLatest(this.authStoreService.getToken());

        return combRef.pipe(
            take(1),
            switchMap(([jwt]) => {
                if (jwt != null) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${jwt.accessToken}`
                        }
                    });
                }
                return next.handle(request).pipe(
                    catchError((err) => {
                        if (err.status === 401) {
                            this.authStoreService.dispatchLogoutAction();
                            Swal.fire('Opss...', 'Sessão expirada', 'error');
                            return empty();
                        }
                        throw error;
                    }) as any
                );
            })
        );
    }
}