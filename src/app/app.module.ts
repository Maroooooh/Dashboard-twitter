import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ChartsComponent } from './Components/charts/charts.component';
import { MapsComponent } from './Components/maps/maps.component';
import { FormsComponent } from './Components/forms/forms.component';
import { TableComponent } from './Components/table/table.component';
import { CalenderComponent } from './Components/calender/calender.component';
import { VerticalNavbarComponent } from './Components/navbar/vertical-navbar/vertical-navbar.component';
import { HorizontalNavbarComponent } from './Components/navbar/horizontal-navbar/horizontal-navbar.component';
import { HttpClientModule} from '@angular/common/http'
import { NgxEchartsModule } from 'ngx-echarts';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';

import { FormsModule } from '@angular/forms';
import { userGuard } from './Guards/user.guard';
import { EdituserComponent } from './Components/edituser/edituser.component';
import { EditpostComponent } from './Components/editpost/editpost.component';
import { EditreplyComponent } from './Components/editreply/editreply.component';
import { EditmsgComponent } from './Components/editmsg/editmsg.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { LineComponent } from './Components/dashboard/line/line.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ChartsComponent,
    MapsComponent,
    FormsComponent,
    TableComponent,
    CalenderComponent,
    VerticalNavbarComponent,
    HorizontalNavbarComponent,
    LineComponent,
    RegisterComponent,
    LoginComponent,
    EdituserComponent,
    EditpostComponent,
    EditreplyComponent,
    EditmsgComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxEchartsModule.forRoot({
     
      echarts: () => import('echarts'),
    })
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
