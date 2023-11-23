import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ChartsComponent } from './Components/charts/charts.component';
import { TableComponent } from './Components/table/table.component';
import { MapsComponent } from './Components/maps/maps.component';
import { FormsComponent } from './Components/forms/forms.component';
import { CalenderComponent } from './Components/calender/calender.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { userGuard } from './Guards/user.guard';
import { EdituserComponent } from './Components/edituser/edituser.component';
import { EditpostComponent } from './Components/editpost/editpost.component';
import { EditreplyComponent } from './Components/editreply/editreply.component';
import { EditmsgComponent } from './Components/editmsg/editmsg.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';

const routes: Routes = [
  {
    path : ''  , component :DashboardComponent , title : "dashboard"
  },{
    path : 'dashboard'  , component :DashboardComponent , title : "dashboard"
  },{
    path : 'charts'  , component :ChartsComponent, title : "charts", canActivate : [userGuard]
  },{
    path : 'users'  , component :TableComponent, title : "Users" , canActivate : [userGuard]
  },{
    path : 'maps'  , component :MapsComponent, title : "maps", canActivate : [userGuard]
  },{
    path : 'posts'  , component :FormsComponent, title : "posts", canActivate : [userGuard]
  },{
    path : 'msgs'  , component :CalenderComponent, title : "massages", canActivate : [userGuard]
  },{
    path : 'register'  , component :RegisterComponent, title : "sign up "
  },{
    path : 'login'  , component :LoginComponent, title : "log in "
  },{
    path : 'edituser/:id'  , component :EdituserComponent, title : "edit user "
  },{
    path : 'editpost/:id'  , component :EditpostComponent, title : "edit post "
  },{
    path : 'editreply/:id'  , component :EditreplyComponent, title : "edit reply "
  },{
    path : 'editmsg/:id'  , component :EditmsgComponent, title : "edit msg "
  },{
    path : 'notifications'  , component :NotificationsComponent, title : "Notifications"
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
