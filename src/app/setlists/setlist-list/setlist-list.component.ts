import { Component, OnInit } from '@angular/core';
import { SetlistService } from '../setlist.service';

@Component({
  selector: 'app-setlist-list',
  templateUrl: './setlist-list.component.html',
  styleUrls: ['./setlist-list.component.scss']
})
export class SetlistListComponent implements OnInit {

  setlists$ = this.setlistService.setlists$;
  
  constructor(private setlistService: SetlistService) { }

  ngOnInit(): void {
  }

}
