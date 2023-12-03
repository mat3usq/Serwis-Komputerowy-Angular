import { Pipe, PipeTransform } from '@angular/core';
import { Report } from 'src/models/Report';
import { Priority } from 'src/models/Priority';

@Pipe({
  name: 'combinedSort',
})
export class combinedSort implements PipeTransform {
  transform(reports: Report[], sortOrder: string, sortBy: string): Report[] {
    if (!reports || reports.length <= 1) {
      return reports || [];
    }

    return reports.slice().sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a['startDate']).getTime();
        const dateB = new Date(b['startDate']).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortBy === 'priority') {
        const priorityOrder: { [key in Priority]: number } = {
          [Priority.normal]: 0,
          [Priority.high]: 1,
        };

        const priorityA = priorityOrder[a['priority']];
        const priorityB = priorityOrder[b['priority']];

        if (!isNaN(priorityA) && !isNaN(priorityB)) {
          const comparison = priorityA - priorityB;
          return sortOrder === 'asc' ? comparison : -comparison;
        }
      }

      return 0;
    });
  }
}
