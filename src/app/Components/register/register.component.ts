import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUsers } from 'src/app/Models/iusers';
import { UsersService } from 'src/app/Services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user: IUsers = {} as IUsers;
  constructor(private userservice: UsersService ,private router: Router) {}
  addNewUser() {
    this.userservice.signupUsers(this.user).subscribe({
      next: (data) => {
        console.log(data);
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
          title: "Signed in successfully"
        });
        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
