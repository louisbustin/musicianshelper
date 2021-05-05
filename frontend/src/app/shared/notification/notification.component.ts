import { Component, Input } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  private showSubject$ = new BehaviorSubject<boolean>(false);
  showNotification$ = this.showSubject$.asObservable();

  @Input()
  contents: string;

  @Input()
  closeInSeconds: number;

  @Input()
  cssClass = 'is-info';
  
  close(): void {
    this.showSubject$.next(false);
  }

  open(): void {
    this.showSubject$.next(true);
    if (this.closeInSeconds > 0) {
      timer(this.closeInSeconds * 1000).subscribe(() => this.showSubject$.next(false));
    }
  }
}
