import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPosts } from '../Models/iposts';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  httpheader= {}
  // inject httpclient
  constructor(private httpclient : HttpClient) { 
    this.httpheader={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
  }
  getAllPosts ():Observable<IPosts[]>{
    return this.httpclient.get<IPosts[]>(`${environment.BaseApiUrl}/posts`)
  }
  getPostById (postId : string ) :Observable<IPosts>{
      return this.httpclient.get<IPosts>(`${environment.BaseApiUrl}/posts/${postId}`) ;
      
    
  }
  // Query String 
  // searchwithnameauthor(name : string) : Observable <IPosts[]> {
  //   return this.httpclient.get <IPosts[]>(`${environment.BaseApiUrl}/posts?author=${name}`)
  // }
  deletePost(postId: string): Observable<any> {
    return this.httpclient.delete<any>(`${environment.BaseApiUrl}/posts/${postId}`);
  }
  
  updatePost(post: IPosts): Observable<IPosts> {
    return this.httpclient.patch<IPosts>(`${environment.BaseApiUrl}/posts/${post._id}`, 
    JSON.stringify(post), this.httpheader);
  }
  updateReply(postId: string, replyId: string, newText: string): Observable<any> {
    const url = `${environment.BaseApiUrl}/posts`;
    const body = { postId, replyId, newText };
    return this.httpclient.patch<any>(url, JSON.stringify(body) , this.httpheader );
  }
  deleteReply(postId: string, replyId: string): Observable<any> {
    const url = `${environment.BaseApiUrl}/posts`;
    const body = { postId, replyId };
    return this.httpclient.request<any>('delete', url, { body });
  }
}

