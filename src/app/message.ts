export interface Message {
  id?: number;
  author: string;
  text: string;
  createdat?: Date;
  comment_by?: number;
  comments?: Message[]
}