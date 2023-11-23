import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { INotifications } from 'src/app/Models/inotifications';
import { NotificationsService } from 'src/app/Services/notifications.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  Notifications:INotifications[] =  [] 
  filteredNoti:INotifications[]=[]
  constructor(public notiservice :NotificationsService , private router : Router){

  }
  ngOnInit(): void {
    this.notiservice.getAllNotifications().subscribe({
      next: (data) => {
        console.log(data);
        this.Notifications = data;
        this.filteredNoti=data;
      },
      error: (err) => {
        console.log(err);
      }
    });
    }
    // post.replies.some(
    //   (reply) =>
    //     reply.text.toLowerCase().includes(term) ||
    //     reply.postedBy.name.toLowerCase().includes(term)
    // );
    search (input : string) : void {
      this.filteredNoti = this.Notifications.filter(
        (noti) =>
          noti.sender.name.toLowerCase().includes(input.toLowerCase()) ||
          noti.text.toLowerCase().includes(input.toLowerCase()) || 
          noti.receiver.some ((user) => user.to.name.toLowerCase().includes (input))
      );
    }
    deleteNoti(notid : string) {
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
          this.notiservice.deleteNoti(notid).subscribe({
            next: () => {
              // console.log(userid);
              this.Notifications = this.Notifications.filter((noti) => noti._id !== notid);
              this.filteredNoti = this.filteredNoti.filter((noti) => noti._id !== notid);
            },
            error: (err) => {
              console.log(err);
            }
          });
          Swal.fire({
            title: "Deleted!",
            text: "The ntification has been deleted.",
            icon: "success"
          });
        }
      });
    }

}
