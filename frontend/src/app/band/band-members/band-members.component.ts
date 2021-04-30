import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-band-members',
  templateUrl: './band-members.component.html',
  styleUrls: ['./band-members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BandMembersComponent {

}
