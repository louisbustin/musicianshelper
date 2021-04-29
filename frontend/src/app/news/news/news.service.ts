import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INewsItem } from 'src/app/models/news-item.model';
import { WebRequestService } from 'src/app/shared/services/web-request.service';

@Injectable({
    providedIn: 'root'
  })
  export class NewsService {
      topNewsItems$ = this.webRequestService.get('posts/top');

      constructor(private webRequestService: WebRequestService) { }

      getNewsItem(newsItemId: string): Observable<INewsItem> {
        return this.webRequestService.get<INewsItem>(`posts/${newsItemId}`);
      }
  }