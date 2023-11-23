import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPosts } from 'src/app/Models/iposts';
import { PostsService } from 'src/app/Services/posts.service';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent {
  post: IPosts = {} as IPosts;
  constructor(private postservice: PostsService, private route: ActivatedRoute , private router : Router) {}
  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id')!;
    this.postservice.getPostById(postId).subscribe({
      next: (data) => {
        console.log('post Data:', data);
        this.post = Array.isArray(data) ? data[0] : data;  
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  updatePost(){
    this.postservice.updatePost(this.post).subscribe({
      next: () => {
        console.log('Post updated successfully');
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        console.log('Error updating post', err);
      }
    });
  }
}
