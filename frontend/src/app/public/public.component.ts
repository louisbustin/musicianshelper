import { ChangeDetectionStrategy, Component } from '@angular/core';
import { INewsItem } from '../models/news-item.model';
import { WebRequestService } from '../shared/services/web-request.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicComponent {
  private homePageId = "6089d163a3c0fc6fbb1b0b83";

  homePageData$ = this.webRequestService.get<INewsItem>(`posts/${this.homePageId}`);

  constructor(
    private webRequestService: WebRequestService
  ) { }
}
