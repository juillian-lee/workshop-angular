import { Component, OnInit } from '@angular/core';
import { AuthStoreService } from 'src/app/store/auth/auth-store.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private authStoreService: AuthStoreService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [''],
      password: ['']
    });

    this.authStoreService.getError().subscribe(err => {
      Swal.fire('Opss...', err, 'error');
    })

  }

  onSubmit() {
    const values = this.form.value;
    this.authStoreService.dispatchSignInAction(values.username, values.password);
  }

}
