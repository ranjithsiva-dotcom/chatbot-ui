import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; // <-- import these
import { AppComponent } from './app.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { ChatService } from './services/chat.service';
import { WebsocketService } from './services/websocket.service';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ChatbotComponent },
  // you can add more routes here
];

@NgModule({
  declarations: [
    AppComponent,
    ChatbotComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes) // <-- add this
  ],
  providers: [ChatService,WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule {}
