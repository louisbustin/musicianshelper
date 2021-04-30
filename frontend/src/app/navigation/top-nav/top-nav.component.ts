import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'navigation-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNavComponent {
  navToggle = false;
}
