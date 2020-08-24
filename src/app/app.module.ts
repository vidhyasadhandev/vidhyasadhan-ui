import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';
import { LoginComponent } from './_components/login/login.component';
import { appInitializer } from './_helpers/app-initializer';
import { AuthserviceService } from './_services/authservice.service';
import { JwtTokenInterceptor } from './_helpers/jwt-token.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './_components/register/register.component';
import { AngmaterialModule } from './angmaterial.module';
import { NotificationComponent } from './_components/notification/notification.component';
import { BroadcastComponent } from './_components/broadcast/broadcast.component';
import { ServiceWorkerModule} from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavigationBarComponent } from './_components/navigation-bar/navigation-bar.component';
import { SidenavBarComponent } from './_components/sidenav-bar/sidenav-bar.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { CalendarComponent } from './_components/calendar/calendar.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { ConfirmationComponent } from './_components/confirmation/confirmation.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { AdminDashboardComponent } from './_components/admin-dashboard/admin-dashboard.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { DemoComponent } from './_components/demo/demo.component';
import { DemolistComponent } from './_components/demolist/demolist.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapcomponentComponent } from './_components/mapcomponent/mapcomponent.component';
import { DatePipe } from '@angular/common';
import { AlertboxComponent } from './_components/alertbox/alertbox.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ClassroomComponent } from './_components/classroom/classroom.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventmodelComponent } from './_components/eventmodel/eventmodel.component';
import { AssignmentsComponent } from './_components/assignments/assignments.component';
import { AttendanceComponent } from './_components/attendance/attendance.component';
import { OtpComponent } from './_components/otp/otp.component';
import { ActivatescreenComponent } from './_components/activatescreen/activatescreen.component';
import { TutorsComponent } from './_components/tutors/tutors.component';
import { DemomodelComponent } from './_components/demomodel/demomodel.component';
import { TutorfilterPipe } from './tutorfilter.pipe';
import { DemodetailComponent } from './_components/demodetail/demodetail.component';
import { ProfilemodelComponent } from './_components/profilemodel/profilemodel.component';
import { DragndirDirective } from './directives/dragndir.directive';
import { AssignmentdetailComponent } from './_components/assignmentdetail/assignmentdetail.component';
import { AssignmentlistComponent } from './_components/assignmentlist/assignmentlist.component';
import { FieldsfilterPipe } from './_pipes/fieldsfilter.pipe';
import { EvaluateComponent } from './_components/evaluate/evaluate.component';
import { EvaluationDetailComponent } from './_components/evaluation-detail/evaluation-detail.component';
import { EarningsComponent } from './_components/earnings/earnings.component';
import { FooterComponent } from './_components/footer/footer.component';
import { VsnavigationComponent } from './_components/vsnavigation/vsnavigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainlayoutComponent } from './_layouts/mainlayout/mainlayout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotificationComponent,
    BroadcastComponent,
    NavigationBarComponent,
    SidenavBarComponent,
    ProfileComponent,
    CalendarComponent,
    ConfirmationComponent,
    DashboardComponent,
    AdminDashboardComponent,
    DemoComponent,
    DemolistComponent,
    MapcomponentComponent,
    AlertboxComponent,
    ClassroomComponent,
    EventmodelComponent,
    AssignmentsComponent,
    AttendanceComponent,
    OtpComponent,
    ActivatescreenComponent,
    TutorsComponent,
    DemomodelComponent,
    TutorfilterPipe,
    DemodetailComponent,
    ProfilemodelComponent,
    DragndirDirective,
    AssignmentdetailComponent,
    AssignmentlistComponent,
    FieldsfilterPipe,
    EvaluateComponent,
    EvaluationDetailComponent,
    EarningsComponent,
    FooterComponent,
    VsnavigationComponent,
    MainlayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    AngmaterialModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    GoogleChartsModule,
    NgxMatFileInputModule,
    NgbModalModule,
    GoogleMapsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    // CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'dfsizfwtr', upload_preset: 'ml_default'}),
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthserviceService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_SNACK_BAR_DATA, useValue: {} },
    DatePipe,
    AlertboxComponent
  ],
  entryComponents: [AlertboxComponent, ProfilemodelComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
