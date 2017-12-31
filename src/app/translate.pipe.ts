import { Pipe, PipeTransform } from '@angular/core';
import { Translate } from './translate';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(private translateConfig: Translate) {}

  transform(value: any): any {
    return this.translateConfig.lanConfig[value];
  }

}
