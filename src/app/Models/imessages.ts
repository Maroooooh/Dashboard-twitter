import { IUsers } from "./iusers";

export interface IMessages {
    _id: string;
    content: string;
    senderId: IUsers;
    recipientId : IUsers; 
}
