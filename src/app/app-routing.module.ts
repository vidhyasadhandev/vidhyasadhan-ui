import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { AuthGuard } from './_helpers/auth.guard';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';


const routes: Routes = [
  { path: '', component: HomeComponent,  canActivate: [AuthGuard] }, // canActivate: [AuthGuard]
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
