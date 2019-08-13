import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    let result = '';

    if (value.akadGradPre) {
      result = `${value.akadGradPre} `;
    }

    result = `${result} ${value.vorname} ${value.nachname}`;

    if (value.akadGradPost) {
      result = `${result} ${value.akadGradPost}`;
    }

    return result;
  }

}
