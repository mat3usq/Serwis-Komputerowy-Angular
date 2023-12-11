import { Injectable } from '@angular/core';
import { Report } from 'src/models/Report';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Status } from 'src/models/Status';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private apiUrl = 'http://localhost:3000/Reports';

  constructor(private httpClient: HttpClient) { }

  getReports(): Observable<Report[]> {
    return this.httpClient.get<Report[]>(this.apiUrl);
  }

  getReportsByUserId(userId: number): Observable<Report[]> {
    return this.httpClient.get<Report[]>(`${this.apiUrl}?userId=${userId}`);
  }

  addReport(report: Report): void {
    this.httpClient.post(`${this.apiUrl}`, report).subscribe();
  }

  updateReport(report: Report): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    
    if (report) {
      if(report['status'] == Status.solved) report['endDate'] = new Date();
      if(report['status'] != Status.solved) report['endDate'] = undefined;
    }
    this.httpClient.put(`${this.apiUrl}/${report['id']}`, report, httpOptions).subscribe({
      complete: () => { location.reload(); }
    });
  }

  assignServicemanToReport(id: number, servicemanId: number): void {
    this.getReportById(id).subscribe({
      next: (report) => {
        if (report) {
          report['servicemanId'] = servicemanId;
          this.updateReport(report);
        } else {
          console.error('Nie znaleziono raportu o podanym ID.');
        }
      },
      error: (err) => { console.log(err); }
    })
  }

  getReportById(id: number): Observable<Report> {
    return this.httpClient.get<Report>(`${this.apiUrl}/${id}`);
  }

  getStartDate(): Observable<Date> {
    return this.httpClient.get<Report[]>(`${this.apiUrl}?_sort=startDate&_order=ASC`).pipe(
      map(reports => {
        if (reports && reports.length > 0) {
          const firstReportStartDate = reports[0]['startDate'];
          return new Date(firstReportStartDate);
        } else {
          throw new Error('Brak raportów lub błąd podczas pobierania danych.');
        }
      })
    );
  }

  getEndDate(): Observable<Date> {
    return this.httpClient.get<Report[]>(`${this.apiUrl}?_sort=startDate&_order=DESC`).pipe(
      map(reports => {
        if (reports && reports.length > 0) {
          const firstReportStartDate = reports[0]['startDate'];
          return new Date(firstReportStartDate);
        } else {
          throw new Error('Brak raportów lub błąd podczas pobierania danych.');
        }
      })
    );
  }
}
