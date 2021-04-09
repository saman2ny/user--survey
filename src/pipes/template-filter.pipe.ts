import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'templateFilter'
})
export class TemplateFilterPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(items: any[], filter: any, filterKey): any {
    console.log(items)
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item[filterKey].toLowerCase().indexOf(filter) !== -1);
  }
}
