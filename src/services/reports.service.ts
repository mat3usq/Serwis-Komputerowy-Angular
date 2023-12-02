import { Injectable } from '@angular/core';
import { Report } from 'src/models/Report';
import { Status } from 'src/models/Status';
import { Priority } from 'src/models/Priority';

@Injectable()
export class ReportsService {
  private localStorageKey = 'reports';

  constructor() {
    // Inicjalizacja localStorage
    const initialReports: Report[] = [
      new Report('Opis raportu 0', Priority.high, Status.solved, new Date('2023-11-26'), 2),
      new Report('Opis raportu 1', Priority.normal, Status.inRealization, new Date('2023-11-27'), 3),
      new Report('Opis raportu 2', Priority.normal, Status.inRealization, new Date('2023-11-28'), 2),
    ];
    if(this.getReportsFromLocalStorage().length == 0 )  localStorage.setItem(this.localStorageKey, JSON.stringify(initialReports));
  }

  getReports(): Report[] {
    return this.getReportsFromLocalStorage();
  }

  getReportsByUserId(userId: number): Report[] {
    const allReports = this.getReportsFromLocalStorage();
    return allReports.filter((report) => report['userId'] === userId);
  }

  addReport(report: Report): void {
    const reports: Report[] = this.getReportsFromLocalStorage();
    report['reportId'] = reports.length; // Temporary ID assignment
    reports.push(report);
    localStorage.setItem(this.localStorageKey, JSON.stringify(reports));
  }

  editReport(reportId: number, status: Status, price: number, endDate: Date): void {
    const reports: Report[] = this.getReportsFromLocalStorage();
    const report = reports.find((r) => r['reportId'] === reportId);
    if (report) {
      report['status'] = status;
      report['price'] = price;
      report['endDate'] = endDate;
      localStorage.setItem(this.localStorageKey, JSON.stringify(reports));
    }
  }

  assignServicemanToReport(reportId: number, servicemanId: number): void {
    const reports: Report[] = this.getReportsFromLocalStorage();
    const report = reports.find((r) => r['reportId'] === reportId);
    if (report) {
      report['servicemanid'] = servicemanId;
      localStorage.setItem(this.localStorageKey, JSON.stringify(reports));
    }
  }

  getReportById(reportId: number): Report | undefined {
    const reports: Report[] = this.getReportsFromLocalStorage();
    return reports.find((report) => report['reportId'] === reportId);
  }
  

  private getReportsFromLocalStorage(): Report[] {
    const reportsJSON = localStorage.getItem(this.localStorageKey);
    return reportsJSON ? JSON.parse(reportsJSON) : [];
  }

}
