import { IUsers } from "./iusers";

export interface IPosts {
    _id: string;
    title: string;
    userId: IUsers;
    replies: { _id : string; text: string; postedBy: IUsers}[];
  
  }
  