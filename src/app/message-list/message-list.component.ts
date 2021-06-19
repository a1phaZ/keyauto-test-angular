import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages : Message[] = [];
  comments: Message[] = [];
  messageId: number | null = this.messageService.getCommentedMessageId();

  onCommentClick(message: Message): void {
    this.messageId = this.messageService.setCommentedMessageId(message);
  }

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.messageService.getMessages()
      .subscribe(messages => this.messages = messages);
  }

}
