// src/app/services/chat.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment'; // adjust path if needed
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket: Socket;
  private sid: string | null = null;

  constructor(private http: HttpClient) {
    this.socket = io(environment.socketUrl, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      timeout: 20000,
      withCredentials: false,
      path: '/socket.io'
    });

    // Get socket id from server
    this.socket.on('hello', (data: { sid: string }) => {
      this.sid = data.sid;
    });
  }

  // --- UPLOAD: POST /upload?sid=<socket.id> with form-data: file=<pdf>
  uploadPdf(file: File): Observable<{ ok: boolean; sid: string; pages?: number; bytes?: number }> {
    if (!this.sid) {
      throw new Error('Connecting… please try again in a moment.');
    }
    const form = new FormData();
    form.append('file', file);
    return this.http.post<{ ok: boolean; sid: string; pages?: number; bytes?: number }>(
      `${environment.socketUrl}/upload?sid=${this.sid}`,
      form
    );
  }

  // --- Existing chat flows ---
  sendMessage(msg: string): void {
    this.socket.emit('sendMessage', msg);
  }

  getMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('receiveMessage', data => observer.next(data));
    });
  }

  askQuestion(question: string): void {
    // fileId not needed; backend uses per-user uploaded PDF
    this.socket.emit('askQuestion', { fileId: null, question });
  }

  getAnswers(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('answer', data => observer.next(data));
    });
  }
}
