// Importuj odpowiednie moduły i klasy
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from 'src/models/Log';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private apiUrl = 'http://localhost:3000/Logs';

  constructor(private http: HttpClient) {}

  async getLogs(): Promise<Observable<Log[]>> {
    const response = await fetch(this.apiUrl, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Nie udało się pobrać danych');
    }

    const logs: Log[] = await response.json();
    const observableLogs: Observable<Log[]> = new Observable((observer) => {
      observer.next(logs);
      observer.complete();
    });

    return observableLogs;
  }

  async addLog(log: Log) {
    console.log(log);
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(log),
    });
  }

  deleteLog(logId: number): void {
    console.log(logId);
    fetch(this.apiUrl + `/${logId}`, {
      method: 'DELETE',
    });
  }
}
