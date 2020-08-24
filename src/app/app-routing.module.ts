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
import { MainlayoutComponent } from './_layouts/mainlayout/mainlayout.component';


const routes: Routes = [
  { path: '', component: MainlayoutComponent, canActivate: [AuthGuard],
  children: [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'navbar', component: NavigationBarComponent},
  { path: 'sidenav', component: SidenavBarComponent},
  { path: 'tutors', component: TutorsComponent},
  { path: 'earnings', component: EarningsComponent},
  { path: 'notifications', component: NotificationComponent},
  { path: 'broadcast', component: BroadcastComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'calendar', component: CalendarComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'admin', component: AdminDashboardComponent},
  { path: 'demos', component: DemoComponent},
  { path: 'demos/create', component: DemoComponent},
  { path: 'demodetail/:id', component: DemodetailComponent},
  { path: 'classroom', component: ClassroomComponent},
  ] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'authenticate', component: OtpComponent},
  { path: 'welcome', component: ActivatescreenComponent},
  { path: 'verifyemail/:userid/:token', component: ConfirmationComponent},
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
