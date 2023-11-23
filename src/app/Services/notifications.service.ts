import { INotifications } from './../Models/inotifications';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  httpheader={};
  constructor(private httpclient : HttpClient) {
    this.httpheader={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
   }
   getAllNotifications(): Observable<INotifications[]> {
    return this.httpclient.get<INotifications[]>(`${environment.BaseApiUrl}/notifications`) 
   }
   deleteNoti(notid: string): Observable<any> {
    return this.httpclient.delete<any>(`${environment.BaseApiUrl}/notifications/${notid}`);
  }
}
