import { Injectable } from '@angular/core';
import { Observable, Subject, Observer } from 'rxjs';

@Injectable()
export class WebsocketService {
  private subject!: Subject<MessageEvent>;

  constructor() {}

  /**
   * Connect to a WebSocket URL and return a Subject<MessageEvent>
   */
  public connect(url: string): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this.subject;
  }

  /**
   * Create a Subject that ties a WebSocket's Observable and Observer
   */
  private create(url: string): Subject<MessageEvent> {
    const ws = new WebSocket(url);

    // Observable: emits messages from the WebSocket
    const observable = new Observable<MessageEvent>((observer: Observer<MessageEvent>) => {
      ws.onmessage = (event) => observer.next(event);
      ws.onerror = (event) => observer.error(event);
      ws.onclose = () => observer.complete();

      // Cleanup when unsubscribed
      return () => ws.close();
    });

    // Observer: sends messages to the WebSocket
    const observer = {
      next: (data: any) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };

    // Create a Subject that bridges observer and observable
    const subject = new Subject<MessageEvent>();
    observable.subscribe(subject); // subscribe to WebSocket messages
    subject.subscribe(observer);   // allow sending messages via subject.next()

    return subject;
  }
}
