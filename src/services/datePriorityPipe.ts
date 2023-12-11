import { Pipe, PipeTransform } from '@angular/core';
import { Report } from 'src/models/Report';
import { Priority } from 'src/models/Priority';

@Pipe({
  name: 'combinedSort',
})
export class combinedSort implements PipeTransform {
  transform(reports: Report[], filters: { dateOrder: string, priority: string, startDate: Date, endDate: Date }): Report[] {
    if (!reports || reports.length <= 1) {
      return reports || [];
    }

    const reportsFilteredByDates = this.getReportsBetweenDates(reports, new Date(filters.startDate), new Date(filters.endDate));

    return this.getReportsWithSpecificPriority(reportsFilteredByDates, filters.priority).slice().sort((a, b) => {
      const dateA = new Date(a["startDate"]);
      const dateB = new Date(b["startDate"]);

      const comparison = dateA.getTime() - dateB.getTime();

      return filters.dateOrder === 'asc' ? comparison : -comparison;
    });

  }

  getReportsBetweenDates(reports: Report[], startDate: Date, endDate: Date): Report[] {

    if (!startDate || !endDate) {
      return reports;
    }

    return reports.filter((report) => {
      const reportDate = new Date(report['startDate'])
      return reportDate >= startDate && reportDate <= endDate;
    });
  }

  getReportsWithSpecificPriority(reports: Report[], priority: string): Report[] {
    if (priority === "all") {
      return reports;
    }
    const lowercasePriority = priority.toLowerCase();
    const formattedPriority = lowercasePriority.charAt(0).toUpperCase() + lowercasePriority.slice(1);

    return reports.filter((report) => report['priority'] === formattedPriority);
  }
}
