export interface IUsers {
  _id: string;
  name: string;// yes
  email: string;// no
  password: string; //no
  profilePicture?: string;  //y
  profileCover?: string;//y
  username?: string;// y
  likedPosts?: string[];
  followers:string[];
  following:string[];
  location?: string; 
  bio?: string;
  birthDate?: string;
  dob?: Date;
  role : string;
  gender : string ;
  verified : boolean
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
