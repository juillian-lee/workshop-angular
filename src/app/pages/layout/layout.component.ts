import { Component, OnInit } from '@angular/core';
import { AuthStoreService } from 'src/app/store/auth/auth-store.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private authStoreService: AuthStoreService
  ) { }

  ngOnInit() {
  }

  onClickLogout(event) {
    event.preventDefault();
    this.authStoreService.dispatchLogoutAction();
  }

}
