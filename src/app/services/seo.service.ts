import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser' 

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private title: Title, 
    private meta: Meta,
    @Inject(DOCUMENT) private doc
    ) { }

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

  public setCanonicalURL() {
    let link: HTMLLinkElement;
    if(!this.doc.querySelector('link[rel="canonical"]')) { 
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    else { 
      link = this.doc.querySelector('link[rel="canonical"]');
    }
    link.setAttribute('href', this.doc.URL);
  }

  private stripHtml(t) {
    t = t.replace(/-/g, ' ');
    t = t.toLowerCase().replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
    });
    t = t.replace(/<[^>]*>/g, '');
    return t;
  }
}
