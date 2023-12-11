// Importuj odpowiednie moduły i klasy
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from 'src/models/Log';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private apiUrl = 'http://localhost:3000/Logs';

  constructor(private httpClient: HttpClient) { }

  getLogs(): Observable<Log[]> {
    return this.httpClient.get<Log[]>(this.apiUrl);
  }

  addLog(log: Log): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.httpClient.post(`${this.apiUrl}`, log, httpOptions).subscribe();
  }

  deleteLog(logId: number): void {
    this.httpClient.delete(`${this.apiUrl}/${logId}`).subscribe();
  }
}
