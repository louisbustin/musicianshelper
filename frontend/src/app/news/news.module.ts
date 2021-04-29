import { NgModule } from '@angular/core';
import { NewsComponent } from './news/news.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NewsItemComponent } from './news-item/news-item.component';

@NgModule({
  declarations: [
    NewsComponent,
    NewsItemComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: NewsComponent,
        children: [
        ]
      },
      {
        path: ':newsItemId', component: NewsItemComponent
      }
    ])
  ]
})
export class NewsModule { }
