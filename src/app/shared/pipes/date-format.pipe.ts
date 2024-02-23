import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    
    // return null;
    let tzoffset = (new Date(value)).getTimezoneOffset() * 60000; // időzóna
    let minOffSet = new Date(value).getTime() - tzoffset;
    let localISOTime = (new Date(minOffSet))
    .toISOString()
    .replace('Z', '')
    .replace('T', '')

    return localISOTime

  }

}
