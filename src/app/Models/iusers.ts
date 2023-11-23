export interface IUsers {
  _id: string;
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  profileCover?: string;
  username?: string;
  likedPosts?: string[];
  location?: string;
  bio?: string;
  birthDate?: string;
  dob?: Date;
  role : string ;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
