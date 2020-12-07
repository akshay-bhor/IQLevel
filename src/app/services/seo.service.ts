import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser' 

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta) { }

  public setTitle(title) {
    this.title.setTitle(title + ' - IQLevel');
  }

  public setDesc(desc) {
    this.meta.updateTag({ name: 'description', content: desc })
  }
}
