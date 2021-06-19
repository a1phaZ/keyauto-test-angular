import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message';
import { Form } from './form';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {
  form = new Form('', '');
  messageId = this.messageService.getCommentedMessageId();

  constructor(private messageService: MessageService) { }

  @Input() id?: number;

  ngOnInit(): void {
  }

  onClear(): void {
    this.form = new Form('', '');
  }

  onSubmit(author: string, text: string): void {
    const message: Message = {
      author,
      text,
      comment_by: this.id
    }
    this.messageService.createMessage(message)
      .subscribe(message => this.messageService.setMessage(message))
    this.form = new Form('', '');
  }

}
