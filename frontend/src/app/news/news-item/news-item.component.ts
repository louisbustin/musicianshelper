import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { NewsService } from '../news/news.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemComponent {

  newsItemId$: Observable<string> = this.route.params.pipe(
    map(params => params['newsItemId'])
  );

  newsItem$ = this.newsItemId$.pipe(
    mergeMap((id) => this.newsService.getNewsItem(id))
  );

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute) { }

}
