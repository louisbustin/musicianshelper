import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BracketGroupsService } from 'src/app/services/bracket-groups.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {

  bracketGroup$ = new BehaviorSubject({});

  constructor(
    private route: ActivatedRoute,
    private groupsService: BracketGroupsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.groupsService.getOne(params['id']).subscribe(bracketGroup => {
        this.bracketGroup$.next(bracketGroup)
      });
    });
  }

}
