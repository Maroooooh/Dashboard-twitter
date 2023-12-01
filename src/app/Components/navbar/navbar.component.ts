import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsers } from 'src/app/Models/iusers';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { UsersService } from 'src/app/Services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  Iam : IUsers={} as IUsers ;
  userLog: boolean ;
  user: IUsers = {} as IUsers;
  constructor(public usersapiservice: UsersService ,private userAuthService: UserAuthService , private router: Router) {
    this.userLog = (localStorage.getItem("token"))?true:false ;
  }
  ngOnInit(): void {
    this.userAuthService.UserLoggedBehavior.subscribe((value) => {
      this.userLog = value;
    });
    // this.userLog=this.userAuthService.isUserLogged;
    const userId :string = localStorage.getItem('id') !;
    this.usersapiservice.getUserById(userId).subscribe({
      next: (data) => {
         this.Iam = data.data ; 
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  isNavbarCollapsed = true;
  
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  logOutFunc() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Log out!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.userAuthService.logout();
        this.userLog = this.userAuthService.isUserLogged;
        this.userAuthService.logged = false; 
        // this.zone.run(() => {
        //   this.userLog = this.userAuthService.isUserLogged;
        // });
        swalWithBootstrapButtons.fire({
          title: "log out!",
          text: "you are logged out .",
          icon: "success"
        });
        this.router.navigate(['/login']);
      } else if (result.dismiss === Swal.DismissReason.cancel ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary is safe :)",
          icon: "error"
        });
      }
    });
    
  }
}
