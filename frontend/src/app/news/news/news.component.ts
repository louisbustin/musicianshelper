import { Component } from '@angular/core';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {

  topNewsItems$ = this.newsService.topNewsItems$;

  constructor(private newsService: NewsService) { }
}
