import { Component, OnInit } from '@angular/core';
import { Email } from './email';
import { SubService } from './subscribe.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [SubService]
})
export class FooterComponent implements OnInit {
  constructor(private sub: SubService) { }

  ngOnInit() {
  }

  // Post Requst for Subscription
  subscribe(email: string): void {
    const newEmail: Email = { email } as Email;
    this.sub.sub(newEmail).subscribe(data => console.log('My: ', data));
  }
}
