import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { AuthGuard } from './_helpers/auth.guard';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { NotificationComponent } from './_components/notification/notification.component';
import { BroadcastComponent } from './_components/broadcast/broadcast.component';
import { NavigationBarComponent } from './_components/navigation-bar/navigation-bar.component';
import { SidenavBarComponent } from './_components/sidenav-bar/sidenav-bar.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { CalendarComponent } from './_components/calendar/calendar.component';
import { ConfirmationComponent } from './_components/confirmation/confirmation.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { AdminDashboardComponent } from './_components/admin-dashboard/admin-dashboard.component';
import { DemolistComponent } from './_components/demolist/demolist.component';
import { DemoComponent } from './_components/demo/demo.component';
import { ClassroomComponent } from './_components/classroom/classroom.component';
import { OtpComponent } from './_components/otp/otp.component';
import { ActivatescreenComponent } from './_components/activatescreen/activatescreen.component';
import { TutorsComponent } from './_components/tutors/tutors.component';
import { DemodetailComponent } from './_components/demodetail/demodetail.component';
import { EarningsComponent } from './_components/earnings/earnings.component';


const routes: Routes = [
  { path: '', component: HomeComponent,  canActivate: [AuthGuard] }, // canActivate: [AuthGuard]
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'authenticate', component: OtpComponent},
  { path: 'welcome', component: ActivatescreenComponent},
  { path: 'tutors', component: TutorsComponent, canActivate: [AuthGuard]},
  { path: 'earnings', component: EarningsComponent, canActivate: [AuthGuard]},
  { path: 'verifyemail/:userid/:token', component: ConfirmationComponent},
  { path: 'navbar', component: NavigationBarComponent },
  { path: 'sidenav', component: SidenavBarComponent, canActivate: [AuthGuard] },
  { path: 'notifications', component: NotificationComponent, canActivate: [AuthGuard]},
  { path: 'broadcast', component: BroadcastComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard]},
  { path: 'demos', component: DemoComponent, canActivate: [AuthGuard]},
  { path: 'demos/create', component: DemoComponent, canActivate: [AuthGuard]},
  { path: 'demodetail/:id', component: DemodetailComponent, canActivate: [AuthGuard]},
  { path: 'classroom', component: ClassroomComponent, canActivate: [AuthGuard]},

  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
