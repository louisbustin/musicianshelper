import { Component, ViewChild } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEmail } from 'src/app/models/email.model';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { EmailService } from 'src/app/shared/services/email.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  emailBody: string;
  emailName: string;
  emailEmail: string;

  email: IEmail = {
    to: 'admin@themusicianhelper.com',
    from: 'admin@themusicianhelper.com',
    subject: 'SITECONTACTUS: Feedback from user',
    text: '',
    replyTo: ''
  }
  
  @ViewChild('notificationBox') 
  notify: NotificationComponent;

  @ViewChild('errorBox') 
  errorBox: NotificationComponent;

  constructor(
    private emailService: EmailService
  ) { }

  sendEmail = (): void => {
    this.email.text = `
    Name: ${this.emailName}
    Email: ${this.emailEmail}
    Text: 
    ${this.emailBody}
    `;

    this.email.replyTo = `${this.emailName} <${this.emailEmail}>`;
    this.emailService.sendEmail(this.email)
    .pipe(
      catchError(() => {
        this.errorBox.open();
        return EMPTY;
      }))
    .subscribe(() => {
        this.notify.open();
    });
  }
}
