import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private conexionBackendUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return {...this._usuario};
  }

  constructor(private http: HttpClient) { }

  registro( name: string, email: string, password: string) {
    const urlRegistro = `${this.conexionBackendUrl}/auth/nuevoUsuario`;
    console.log(email);
    const body = { name, email, password } ;

    return this.http.post<AuthResponse>(urlRegistro, body)
    .pipe(
      tap( resp => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token! )
          this._usuario = {
            name: resp.name!,
            uid:  resp.uid!,
            email: resp.email!
          }
        }
      }),
      map( resp => resp.ok),
      catchError( err => of(err.error.msg))
    )
  }




  login ( email: string, password: string) {

    const construccionDelUrl = `${this.conexionBackendUrl}/auth/loginUsuario`;
    const body = { email, password };

    return this.http.post<AuthResponse>(construccionDelUrl, body)
    .pipe(
      tap( resp => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token! )
          this._usuario = {
            name: resp.name!,
            uid:  resp.uid!,
            email: resp.email!
          }
        }
      }),
      map( resp => resp.ok),
      catchError( err => of(err.error.msg))
    )
  }


  validarToken(): Observable<boolean> {

    const urlValidar = `${this.conexionBackendUrl}/auth/validarUsuario`;

    const headers = new HttpHeaders()
    .set( 'x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(urlValidar, {headers})
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
localStorage.clear();// destruir el token
}


}
