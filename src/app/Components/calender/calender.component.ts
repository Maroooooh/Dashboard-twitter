import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import { IMessages } from 'src/app/Models/imessages';
import { MessagesService } from 'src/app/Services/messages.service';
import Swal from 'sweetalert2';
function generateRandomData(length: number, min: number, max: number): number[] {
  const randomData = [];
  for (let i = 0; i < length; i++) {
    randomData.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return randomData;
}
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})

export class CalenderComponent implements OnInit {
  Msgs :IMessages[] =  [] 
  filteredMsgs:IMessages[]=[]
  constructor(public msgservice :MessagesService , private router : Router){

  }
  ngOnInit(): void {
    this.msgservice.getAllMsgs().subscribe({
      next: (data) => {
        console.log(data);
        this.Msgs = data;
        this.filteredMsgs=data;
      },
      error: (err) => {
        console.log(err);
      }
    });
    
  }
  deleteMsg(msgId :string){
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
        this.msgservice.deleteMsg(msgId).subscribe({
          next: () => {
            // console.log(userid);
            this.Msgs = this.Msgs.filter((msg) => msg._id !== msgId);
            this.filteredMsgs = this.filteredMsgs.filter((msg) => msg._id !== msgId);
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

  search(input :string){
    this.filteredMsgs = this.Msgs.filter(
      (msg) =>
        msg.senderId.name.toLowerCase().includes(input.toLowerCase()) ||
        msg.content.toLowerCase().includes(input.toLowerCase()) ||
        msg.recipientId.name.toLowerCase().includes(input.toLowerCase())
    );
  }
  editMsg(msg : IMessages){
      this.router.navigate(['/editmsg',msg._id])
  }
}
