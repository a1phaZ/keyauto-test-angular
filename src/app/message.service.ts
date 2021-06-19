import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messagesUrl = 'https://alpha-test-api.herokuapp.com/messages';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  commentedMessageId: number | null = null;
  messages: Message[] = [];

  constructor(
    private http: HttpClient
  ) { }

  setMessages(messages: Message[]): void {
    this.messages = messages;
  }

  setMessage(message: Message): void {
    if (!message.comment_by) {
      this.messages.push(message);
      return;
    }

    const { messages } = this;
    const idx = messages.findIndex(({id}) => message.comment_by === id);
    messages[idx].comments?.push(message);
    this.messages = messages;
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.messagesUrl)
      .pipe(
        tap((messages: Message[]) => {
          this.log('fetched messages');
          this.messages = messages;
        }),
        catchError(this.handleError<Message[]>('getMessages', []))
      )
  }
  
  createMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.messagesUrl, message, this.httpOptions).pipe(
      tap((newMessage: Message) => {
        console.log('created new message', newMessage);
      }),
      catchError(this.handleError<Message>('createMessage'))
    )
  }

  setCommentedMessageId(message: Message): number | null {
    this.commentedMessageId = message.id || null;
    return this.commentedMessageId;
  }

  unsetCommentedMessage():void {
    console.log('unset');
    this.commentedMessageId = null;
  }

  getCommentedMessageId(): number | null {
    return this.commentedMessageId
  }

  private handleError<T>(operation = 'operation', result? : T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }

  private log(m: string): void {
    console.log(m);
  }
}
