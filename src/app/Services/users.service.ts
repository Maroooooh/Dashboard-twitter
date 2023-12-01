import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsers } from '../Models/iusers';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpheader = {}
  constructor(private httpclient : HttpClient) {
      this.httpheader={
        headers:new HttpHeaders({
          'Content-Type':'application/json'
        })
      };
   }
   // header in post put patch 
  signupUsers(user : IUsers):Observable <IUsers> {
    return this.httpclient.post <IUsers> (`${environment.BaseApiUrl}/users/signup` , JSON.stringify
    (user) , this.httpheader).pipe(
      retry(3),
      catchError((err)=>{
        return throwError(()=>{
          // return new Error(err)
          return new Error('Error while signing up')
        })
      })
    ) ;

  }
  getAllUsers ():Observable<IUsers[]>{
    return this.httpclient.get<IUsers[]>(`${environment.BaseApiUrl}/users`) 
  }
  getUserById(userId: string): Observable<any> {
    return this.httpclient.get<any>(`${environment.BaseApiUrl}/users/${userId}`);
  }
  
  updateUser(user: IUsers): Observable<IUsers> {
    return this.httpclient.patch<IUsers>(`${environment.BaseApiUrl}/users/editprofile/${user._id}`, 
    JSON.stringify(user), this.httpheader);
  }
  deleteUser(userId: string): Observable<any> {
    return this.httpclient.delete<any>(`${environment.BaseApiUrl}/users/${userId}`);
  }
  updatetoggleStatus(user : IUsers) :Observable<any> {
    return this.httpclient.put<any>(`${environment.BaseApiUrl}/users/${user._id}/toggle-status`,JSON.stringify(user) , this.httpheader)
  }
}
