import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMessages } from 'src/app/Models/imessages';
import { MessagesService } from 'src/app/Services/messages.service';

@Component({
  selector: 'app-editmsg',
  templateUrl: './editmsg.component.html',
  styleUrls: ['./editmsg.component.scss']
})
export class EditmsgComponent {
  msg: IMessages = {} as IMessages;
  constructor(private msgservice: MessagesService, private route: ActivatedRoute , private router : Router) {}
  ngOnInit(): void {
    const msgId = this.route.snapshot.paramMap.get('id')!;
    this.msgservice.getMsgById(msgId).subscribe({
      next: (data) => {
        console.log('msg Data:', data);
        this.msg = Array.isArray(data) ? data[0] : data;  
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  updateMsg(){
    this.msgservice.updateMsg(this.msg).subscribe({
      next: () => {
        console.log('msg updated successfully');
        this.router.navigate(['/msgs']);
      },
      error: (err) => {
        console.log('Error updating msg', err);
      }
    });
  }
}
