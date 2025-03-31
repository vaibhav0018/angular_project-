import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../message.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-messages',
  imports: [ CommonModule ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
    
  }

}
