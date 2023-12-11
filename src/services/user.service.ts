import { Injectable } from '@angular/core';
import { Client } from '../models/Client';
import { Observable, of, throwError, forkJoin } from 'rxjs';
import { catchError, retry, map, filter } from 'rxjs/operators';
import { Serviceman } from 'src/models/Serviceman';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrlClients = 'http://localhost:3000/Clients';
  private apiUrlServicemen = 'http://localhost:3000/Servicemen';

  private loggedUserLocalStorageKey = 'logged';
  private isServicemanLocalStorageKey = 'isServiceman';

  constructor(private httpClient: HttpClient) { }

  doesEmailExist(email: string): Observable<boolean> {
    const clientsEmails = this.httpClient.get<Client[]>(`${this.apiUrlClients}`).pipe(
      map(clients => clients.map(client => client['email']))
    );

    const servicemenEmails = this.httpClient.get<Serviceman[]>(`${this.apiUrlServicemen}`).pipe(
      map(servicemen => servicemen.map(serviceman => serviceman['email']))
    );

    return forkJoin([clientsEmails, servicemenEmails]).pipe(
      map(([clientsEmails, servicemenEmails]) => {
        const allEmails = [...clientsEmails, ...servicemenEmails];
        return allEmails.includes(email);
      })
    );
  }

  isServiceman(): boolean {
    const isClientJSON = localStorage.getItem(this.isServicemanLocalStorageKey);
    return isClientJSON ? JSON.parse(isClientJSON) === true : false;
  }

  addLoggedUser(userId: number, isServiceman: boolean) {
    localStorage.setItem(this.isServicemanLocalStorageKey, JSON.stringify(isServiceman));
    localStorage.setItem(this.loggedUserLocalStorageKey, JSON.stringify(userId));
  }

  getLoggedUserId(): number {
    const userIdJSON = localStorage.getItem(this.loggedUserLocalStorageKey);
    return userIdJSON ? parseInt(userIdJSON) : -1;
  }

  getUser(email: string, password: string): Observable<any> {
    localStorage.clear();

    const client$ = this.httpClient.get<any[]>(`${this.apiUrlClients}`).pipe(
      map(clients => clients.find(client => client['email'] === email && client['password'] === password))
    );

    const serviceman$ = this.httpClient.get<any[]>(`${this.apiUrlServicemen}`).pipe(
      map(servicemen => servicemen.find(serviceman => serviceman['email'] === email && serviceman['password'] === password))
    );

    return forkJoin([client$, serviceman$]).pipe(
      map(([foundClient, foundServiceman]) => {
        if (foundClient) {
          foundClient['userType'] = 'client';
          return foundClient;
        } else if (foundServiceman) {
          foundServiceman['userType'] = 'serviceman';
          return foundServiceman;
        } else {
          return undefined;
        }
      })
    );
  }

  addClient(client: Client): void {
    const body = JSON.stringify(client);
    this.httpClient.post(`${this.apiUrlClients}`, body).subscribe();
  }

  addServiceman(serviceman: Serviceman): void {
    const body = JSON.stringify(serviceman);
    this.httpClient.post(`${this.apiUrlServicemen}`, body).subscribe();
  }
}
