import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs' ;
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  UserLoggedBehavior:BehaviorSubject<boolean>;
  logged : boolean = false ; 
  constructor(private httpclient : HttpClient) { 
    this.UserLoggedBehavior= new BehaviorSubject<boolean>(this.isUserLogged) ;
  }
  login(userEmail: string, userPassword: string, role: string): Observable<any> {
    // Assuming you have a login endpoint that returns a token
    return this.httpclient.post<any>(`${environment.BaseApiUrl}/users/logindashboard`, { email: userEmail, password: userPassword, role: role })
      .pipe(
        tap(response => {
          const token = response.token;
          const userId  =response.id ;
          localStorage.setItem('token', token);
          localStorage.setItem('id', userId);
          this.UserLoggedBehavior.next(true);
        }),
        catchError(error => {
          console.error('Login failed ', error);
          throw error; 
        })
      );
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.UserLoggedBehavior.next(false);
  }
  get isUserLogged(): boolean{
    return (localStorage.getItem("token"))?true:false;
  }
}
