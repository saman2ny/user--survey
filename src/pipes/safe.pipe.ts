import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(readonly sr: DomSanitizer){}  

  transform(html: string) : SafeHtml {
    return this.sr.bypassSecurityTrustHtml(html); 
 } 

}
