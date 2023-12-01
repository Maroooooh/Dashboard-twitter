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
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
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
    NgxPaginationModule,
    NgxEchartsModule.forRoot({
     
      echarts: () => import('echarts'),
    })
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
