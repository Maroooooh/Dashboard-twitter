import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMessages } from '../Models/imessages';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  httpheader={ };

  constructor(private httpclient : HttpClient) {
    this.httpheader={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
   }
  getAllMsgs():Observable<IMessages[]>{
    return this.httpclient.get<IMessages[]>(`${environment.BaseApiUrl}/messages`) 
  }
  getMsgById(msgId : string) :Observable <IMessages>{
    return this.httpclient.get<IMessages>(`${environment.BaseApiUrl}/messages/${msgId}`) ;

  }
  deleteMsg(msgId: string): Observable<any> {
    return this.httpclient.delete<any>(`${environment.BaseApiUrl}/messages/${msgId}`);
  }
  updateMsg(msg: IMessages): Observable<IMessages> {
    return this.httpclient.patch<IMessages>(`${environment.BaseApiUrl}/messages/${msg._id}`, 
    JSON.stringify(msg), this.httpheader);
  }
}
