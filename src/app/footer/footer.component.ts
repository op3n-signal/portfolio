import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmailService } from '../shared/services/email.service';
import { Email } from './email';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  user: Email = {
    email: '',
    message: ''
  }
  success: string = '';
  error: string = '';
  messageStatus: string = '';
  emailSub!: Subscription;


  constructor(private emailService: EmailService) {}

  ngOnInit(): void {}

  resetAlerts(): void {
    this.error = '';
  }

  send(f: NgForm): void {
    this.resetAlerts();
    this.messageStatus = 'Waiting...';
    this.emailSub = this.emailService.sendEmail(this.user).subscribe((res: any) => {
        this.messageStatus = "Message Sent!";
      }, (err) => {
        if(err == HttpErrorResponse)
          console.error(err);
      }
    );
    f.reset();
  }

  scrollTop(): void {
      window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
      this.emailSub.unsubscribe();
  }
}
