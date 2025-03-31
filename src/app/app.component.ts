import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MessagesComponent } from './components/messages/messages.component';
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [MessagesComponent,RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Lets Start Game';
}
