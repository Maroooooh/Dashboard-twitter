import { IUsers } from "./iusers";

export interface INotifications {
    _id : string ; 
    sender :IUsers; 
    receiver : { to : IUsers} [];
    text: string;
    type: string ;
}
