import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Message } from '../_models/Message';
import { Pagination } from '../_models/pagination';
import { ConfirmService } from '../_services/confirm.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages: Message[] = [];
  pagination: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private messageService: MessageService, private confimService: ConfirmService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).pipe(take(1))
      .subscribe(response => {
        this.messages = response.result;
        this.pagination = response.pagiantion;
        this.loading = false;
      });
  }

  deleteMessage(id: number): void {
    this.confimService.confirm('Confirm delete message', 'This cannot be undone').subscribe(result => {
      if (result) {
        this.messageService.deleteMessage(id).subscribe(() => {
          this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        });
      }
    });
  }

  changePage(): void {
    this.pageNumber = 2;
    this.loadMessages();
  }

  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.loadMessages();
  }
}
