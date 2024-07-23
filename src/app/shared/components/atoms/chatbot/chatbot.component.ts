// chatbot.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isOpen = false;

  toggleChat() {
    this.isOpen = !this.isOpen;
  }
}