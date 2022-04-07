import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlDecoder'
})
export class UrlDecoderPipe implements PipeTransform {

  transform(value: string | undefined): string {
    const decoded = decodeURIComponent(value as string);
    return decoded;
  }
}
