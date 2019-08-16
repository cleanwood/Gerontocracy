import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'url'
})
export class UrlPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.replace('http://', '').replace('https://', '').split(/[/?#]/)[0];
  }

}
