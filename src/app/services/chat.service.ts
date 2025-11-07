import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment'; // adjust path if needed

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.socketUrl, {
      transports: ['websocket', 'polling'], // allow fallback for some hosts
      reconnectionAttempts: 5,
      timeout: 20000,
      withCredentials: false,               // CORS-friendly
      path: '/socket.io'                    // default path (explicit)
    });
  }

  sendMessage(msg: string): void {
    this.socket.emit('sendMessage', msg);
  }

  getMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('receiveMessage', data => observer.next(data));
    });
  }

  askQuestion(fileId: string, question: string): void {
    this.socket.emit('askQuestion', { fileId, question });
  }

  getAnswers(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('answer', data => observer.next(data));
    });
  }
}
