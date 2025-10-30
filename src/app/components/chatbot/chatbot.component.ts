import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

interface ChatMessage {
  author: string;
  message: string;
  timestamp?: Date;
  avatar?: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  message: string = '';
  messages: ChatMessage[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // Listen for messages from backend
    this.chatService.getMessages().subscribe((msg: any) => {
      const displayMsg = typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg;
      this.messages.push({
        author: 'Chatbot',
        message: displayMsg,
        timestamp: new Date(),
        avatar: 'https://randomuser.me/api/portraits/lego/2.jpg'
      });
    });

    // Listen for chatbot answers
    this.chatService.getAnswers().subscribe((data) => {
      this.messages.push({
        author: 'Chatbot',
        message: data.answer || data,
        timestamp: new Date(),
        avatar: 'https://randomuser.me/api/portraits/lego/2.jpg'
      });
    });
  }

  sendMsg(): void {
    if (!this.message.trim()) return;

    this.messages.push({
      author: 'You',
      message: this.message,
      timestamp: new Date(),
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
    });

    // Send to backend
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
