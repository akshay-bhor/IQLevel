import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser' 

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta) { }

  public setTitle(title) {
    this.title.setTitle(this.stripHtml(title).substring(0, 66) + ' - IQLevel');
  }

  public setDesc(desc) {
    this.meta.updateTag({ name: 'description', content: desc });
  }

  public setOGImg(imgURL) {
    this.meta.updateTag({ property: 'og:image', content: imgURL });
  }

  private stripHtml(t) {
    t = t.replace(/-/g, ' ');
    t = t.toLowerCase().replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
    });
    return t;
  }
}
