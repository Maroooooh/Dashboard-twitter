import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsers } from 'src/app/Models/iusers';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLog: boolean = false;
  user: IUsers = {} as IUsers;
  constructor(private userAuthService: UserAuthService , private router: Router) {}
  ngOnInit(): void {
    this.userLog = this.userAuthService.isUserLogged;
  }
  

  loginFunc() {
    // Call the login function in your service
    this.userAuthService.login(this.user.email, this.user.password, this.user.role).subscribe(
      () => {
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
          title: "Log in successfully"
        });
        // this.userAuthService.isUserLogged = true ; 
        this.userAuthService.logged = true ;
        this.userLog = this.userAuthService.isUserLogged;
  
        this.router.navigate(['/dashboard']);

      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your Email or password went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
        
      }
    );
  }
  
}
