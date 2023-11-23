import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPosts } from 'src/app/Models/iposts';
import { PostsService } from 'src/app/Services/posts.service';

@Component({
  selector: 'app-editreply',
  templateUrl: './editreply.component.html',
  styleUrls: ['./editreply.component.scss']
})
export class EditreplyComponent {
  post: IPosts = {} as IPosts;
  replyId : string="" ; 
  constructor(private postservice: PostsService, private route: ActivatedRoute , private router : Router) {}
  ngOnInit(): void {
 
  }
}
