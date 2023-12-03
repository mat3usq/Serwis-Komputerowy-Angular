import { Pipe, PipeTransform } from '@angular/core';
import { Report } from 'src/models/Report';

@Pipe({
  name: 'dateSort'
})
export class DateSortPipe implements PipeTransform {
  transform(reports: Report[], sortOrder: 'asc' | 'desc' = 'asc'): Report[] {
    // if (!reports || reports.length <= 1) {
    //   return reports;
    // }
    // return reports.sort((a, b) => {
    //   const dateA = new Date(a['startDate']).getTime();
    //   const dateB = new Date(b['startDate']).getTime();

    //   return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    // });
    return reports;
  }
}