import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser' 

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta) { }

  public setTitle(title) {
    let titleTxt = this.stripHtml(title).substring(0, 66);
    // remove last word to prevent word break
    if(titleTxt.length >= 66) 
      titleTxt = titleTxt.substring(0, titleTxt.lastIndexOf(" "));
    this.title.setTitle(titleTxt + ' - IQLevel');
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
