import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tag-cloud',
  templateUrl: './tag-cloud.component.html',
  styleUrls: ['./tag-cloud.component.scss']
})
export class TagCloudComponent {

  @Input()
  tags: string[];

  @Input()
  placeholder = "";

  @Output()
  tagsChanged = new EventEmitter<string[]>();

  deleteClick(tag: string): void {
    this.tags = this.tags.filter((ele) => ele != tag);
    this.tagsChanged.emit(this.tags);
  }

  addTag(tag: string): void {
    if (tag && this.tags.findIndex((ele) => ele === tag) < 0) {
      this.tags.push(tag);
      this.tagsChanged.emit(this.tags);
    }
  }



}
