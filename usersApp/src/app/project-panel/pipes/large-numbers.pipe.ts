import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'largeNumbers'
})
export class LargeNumbersPipe implements PipeTransform {

  transform(number) {
    let suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];
    if (number < 1000) {
      return number;
    }
    let exp = Math.floor(Math.log(number) / Math.log(1000));
    return (number / Math.pow(1000, exp)).toFixed(2) + suffixes[exp - 1];
  }

}
