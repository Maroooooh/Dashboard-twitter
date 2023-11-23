import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsers } from 'src/app/Models/iusers';
import { UsersService } from 'src/app/Services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  Users: IUsers[] = [];
  filteredUsers: IUsers[] = []; // Add a new array for filtered users
  isNameAsc = true;
  constructor(public usersapiservice: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.usersapiservice.getAllUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.Users = data;
        this.filteredUsers = data; // Initialize filteredUsers with all users initially
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteUser(userid: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersapiservice.deleteUser(userid).subscribe({
          next: () => {
            console.log(userid);
            this.Users = this.Users.filter((user) => user._id !== userid);
            this.filteredUsers = this.filteredUsers.filter((user) => user._id !== userid);
          },
          error: (err) => {
            console.log(err);
          }
        });
        Swal.fire({
          title: "Deleted!",
          text: "The user has been deleted.",
          icon: "success"
        });
      }
    });
  }

  search(text: string): void {
    
    this.filteredUsers = this.Users.filter(
      (user) =>
        user.name.toLowerCase().includes(text.toLowerCase()) ||
        user.email.toLowerCase().includes(text.toLowerCase())
    );
  }

  editUser(user: IUsers): void {
    this.router.navigate(['/edituser', user._id]);
  }
  updateUserStatus(event: any, user: IUsers) {
    this.usersapiservice.updatetoggleStatus(user).subscribe({
      next: () => {
      
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  sortByName(): void {
    this.isNameAsc = !this.isNameAsc;

    this.filteredUsers.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (this.isNameAsc) {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }
}

