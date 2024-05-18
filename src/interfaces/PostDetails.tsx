import IUser from "./User";

export default interface IPostDetails {
  id: string;
  title: string;
  content: string;
  imageURI: string;
  eventTitle: string;
  participants: number;
  friends: IUser[];
  subscribed: boolean;
}
