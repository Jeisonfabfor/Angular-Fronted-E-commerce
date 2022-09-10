import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';
import { AuthResponse } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  miFormulario : FormGroup = this.fb.group({

    email:    ['jeifab@gmail.com', [Validators.required, Validators.email]],
    password: ['123456789', [Validators.required, Validators.minLength(6)]]

  })

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService) { }

login () {

  console.log(this.miFormulario.value)

  const {email, password} = this.miFormulario.value;

  this.authService.login( email, password )
    .subscribe( ok => {

     console.log(ok);

      if ( ok === true ) {
        this.router.navigateByUrl('/dashboard')
      } else {
        Swal.fire('Error',ok, 'error' );
      }
    })
}


/* validarToken(): Observable<boolean> {

  const url = `${ this.baseUrl }/auth/validarUsuario`;
  const headers = new HttpHeaders()
    .set('x-api-key', localStorage.getItem('token') || '' );

  return this.http.get<AuthResponse>( url, { headers } )
      .pipe(
        map( resp => {
          localStorage.setItem('token', resp.token! );
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!
          }

          return resp.ok;
        }),
        catchError( err => of(false) )
      );

}

logout() {
  localStorage.clear();
} */


}
