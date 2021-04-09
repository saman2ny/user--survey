import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';


@Pipe({
  name: 'showDate'
})
export class ShowDatePipe implements PipeTransform {

  //   transform(value) {
  //     var datePipe = new DatePipe("en-US");
  //     value=new Date(value);
  //      value = datePipe.transform(value, 'dd/MM/yyyy hh:mm a');
  //      return value;
  //  }



  transform(value) {
    // console.log(value, "date")
    // value = new Date(value);
    if (!value) {
      return  "";
      // return  moment(new Date()).format("DD MMM YYYY hh:mm a");

      // return new Date();
    }
    const utcDate = moment.utc(value);
    var utcDate2 = new Date(utcDate.format());
    var datePipe = new DatePipe('en');
    value = datePipe.transform(utcDate2, 'dd MMM yyyy hh:mm a');
    return value;

  }

}
