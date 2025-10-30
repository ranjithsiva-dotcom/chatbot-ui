import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;

  constructor() {
    // Connect to backend Socket.IO server
    this.socket = io('http://localhost:5000', {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 20000
    });
  }

  sendMessage(msg: string): void {
    this.socket.emit('sendMessage', msg);
  }

  getMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('receiveMessage', (data) => observer.next(data));
    });
  }

  askQuestion(fileId: string, question: string): void {
    this.socket.emit('askQuestion', { fileId, question });
  }

  getAnswers(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('answer', (data) => observer.next(data));
    });
  }
}
