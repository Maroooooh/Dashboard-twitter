import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsers } from 'src/app/Models/iusers';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horizontal-navbar',
  templateUrl: './horizontal-navbar.component.html',
  styleUrls: ['./horizontal-navbar.component.scss']
})
export class HorizontalNavbarComponent implements OnInit {
  userLog: boolean ;
  user: IUsers = {} as IUsers;
  constructor(private userAuthService: UserAuthService , private router: Router) {
    this.userLog = (localStorage.getItem("token"))?true:false ;
  }
  ngOnInit(): void {
    this.userLog=this.userAuthService.isUserLogged;
  }
  logOutFunc() {
    this.userAuthService.logout();
    this.userLog = this.userAuthService.isUserLogged;
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Log out successfully"
    });
    this.userAuthService.logged = false; 
    this.router.navigate(['/login']);

  }

}
