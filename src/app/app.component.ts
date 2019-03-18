import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import { AuthStoreService } from './store/auth/auth-store.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'workshop-angular';

  constructor(
    private router: Router,
    private authStoreService: AuthStoreService
  ) {}

  ngOnInit() {
    const pathname = location.pathname;
    /**
     * Dispacha uma ação para verificar se o usuários já não esta logado
     */
    this.authStoreService.dispatchCheckSigninAction();

    /**
     * Se inscreve para saber se o usuário esta logado ou não
     */
    this.authStoreService
      .getIsLoggedIn().pipe(
        map(isLoggedIn => {
          if(isLoggedIn && pathname.includes('/login')) {
            return '/';
          }
          return isLoggedIn ? pathname : '/login'
        })
      )
      .subscribe(route => {
        this.router.navigate([route]);
      });
  }

}
