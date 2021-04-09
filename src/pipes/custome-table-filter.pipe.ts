import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customeTableFilter'
})
export class CustomeTableFilterPipe implements PipeTransform {

  transform(items: any[], filter: any, filterKey:any): any {
    // console.log(items)
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    let it=[]
    for(let i=0;i<items.length;i++){
      let item=items[i]
      if(item[filterKey].toLowerCase().indexOf(filter.toLowerCase())>=0)
      it.push(item);
    }
    return it;
    // return items.filter(item =>{
    //   item[filterKey].toLowerCase().indexOf(filter.toLowerCase()) != -1
    // });
  }

}
