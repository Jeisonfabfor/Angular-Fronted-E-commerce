import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  miFormulario : FormGroup = this.fb.group({

    name:     ['fabian',           [Validators.required]],
    email:    ['fabian@gmail.com', [Validators.required, Validators.email]],
    password: ['9876543210',       [Validators.required, Validators.minLength(6)]],


  })

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService) { }

registro () {

  console.log(this.miFormulario.value)

  const {name, email, password} = this.miFormulario.value;

  this.authService.registro( name, email, password )
    .subscribe( ok => {

     console.log(ok);

      if ( ok === true ) {
        this.router.navigateByUrl('/dashboard')
      } else {
        Swal.fire('Error',ok, 'error' );
      }
    })




 /*  this.router.navigateByUrl('/dashboard') */
}



}
