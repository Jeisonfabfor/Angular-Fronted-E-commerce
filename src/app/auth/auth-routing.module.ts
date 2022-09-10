import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routerChild : Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: '**',
        redirectTo:'login'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routerChild)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
