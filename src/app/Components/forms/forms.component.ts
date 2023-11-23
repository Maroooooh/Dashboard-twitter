
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { IPosts } from 'src/app/Models/iposts';
import { PostsService } from 'src/app/Services/posts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
   Posts : IPosts[] = []; 
   filteredPosts : IPosts[] = [] ;
   constructor (public postsapiservice : PostsService, private router : Router){

   }
  ngOnInit(): void {
    this.postsapiservice.getAllPosts().subscribe({
      next:(data)=>{
        console.log(data);
        this.Posts = data
        this.filteredPosts =  [...this.Posts]; 
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  deletePost(postId: string): void {
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
        this.postsapiservice.deletePost(postId).subscribe({
          next: () => {
            this.filteredPosts = this.filteredPosts.filter(post => post._id !== postId);
          },
          error: (err) => {
            console.log(err);
          }
        });
        Swal.fire({
          title: "Deleted!",
          text: "The post has been deleted.",
          icon: "success"
        });
      }
    });
    
  }
  
  
  search(text: string): void {
    const searchTerm = text.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredPosts = [...this.Posts];
      return;
    }

    this.filteredPosts = this.Posts.filter((post) =>
      this.postContainsSearchTerm(post, searchTerm)
    );
  }

  private postContainsSearchTerm(post: IPosts, term: string): boolean {
    return (
      post.title.toLowerCase().includes(term) ||
      post.userId.name.toLowerCase().includes(term) ||
      this.postContainsReplies(post, term)
    );
  }

  private postContainsReplies(post: IPosts, term: string): boolean {
    return post.replies.some(
      (reply) =>
        reply.text.toLowerCase().includes(term) ||
        reply.postedBy.name.toLowerCase().includes(term)
    );
  }
  editPost(post:IPosts){
      this.router.navigate(['/editpost', post._id] ); 
  }  
  editReply(post:IPosts , replyId : string  ){
      this.router.navigate(['/editreply' , replyId]) ;
  }
  
  deleteReply(postId : string  ,replyId : string) {
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
        this.postsapiservice.deleteReply(postId, replyId).subscribe(
          (response) => {
            console.log('Reply deleted successfully', response);
      
            // Find the post in the array
            const post = this.Posts.find(post => post._id === postId);
      
            // If the post is found, filter out the deleted reply
            if (post) {
              post.replies = post.replies.filter(reply => reply._id !== replyId);
            }
          },
          (error) => {
            console.error('Error deleting reply', error);
          }
        );
        Swal.fire({
          title: "Deleted!",
          text: "The reply has been deleted.",
          icon: "success"
        });
      }
    });
  }
}
