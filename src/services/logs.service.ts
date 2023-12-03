import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from 'src/models/Log';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private apiUrl = 'http://localhost:3000/Logs'; // Adres API JSON Servera

  constructor(private http: HttpClient) {}

  // Pobierz wszystkie logi
  getLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(this.apiUrl).pipe(
        map((logs: Log[])=> logs.map(
            log => {
                console.log(log['reportId'],log['status'],log['price'],log['logDate']);
                return new Log(log['reportId'],log['status'],log['price'],log['logDate']);
            }
        ) )
    )
  }
  

  // Dodaj nowy log
  addLog(log: Log): Observable<Log> {
    return this.http.post<Log>(this.apiUrl, log);
  }
}
