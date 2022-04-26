import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string): string | null {
    return this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, (this.sanitizer.bypassSecurityTrustResourceUrl(value)));
  }
}