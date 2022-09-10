import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';


const ChildRoute: Routes = [

  {
    path: '',
    children: [
      {
        path:'', component: DashboardComponent
      },
      {
        path:'**', redirectTo: ''
      }
    ]

  }
]


@NgModule({

  imports: [RouterModule.forChild(ChildRoute)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
