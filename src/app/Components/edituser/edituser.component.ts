import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsers } from 'src/app/Models/iusers';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss'],
})
export class EdituserComponent {
  user: IUsers = {} as IUsers;
  constructor(private userservice: UsersService, private route: ActivatedRoute , private router : Router) {}
  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id')!;
    this.userservice.getUserById(userId).subscribe({
      next: (dataxx) => {
        console.log('User Data:', dataxx.data);
        this.user = dataxx.data;  
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  
  updateUser(): void {
    this.userservice.updateUser(this.user).subscribe({
      next: () => {
        console.log('User updated successfully');
        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.log('Error updating user', err);
      }
    });
  }
}
