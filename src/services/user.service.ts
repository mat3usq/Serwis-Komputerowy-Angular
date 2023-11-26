import { Injectable } from '@angular/core';
import { Client } from '../models/Client';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private usersUrl = 'api/clients/';
    constructor(private http: HttpClient) { }

    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.usersUrl).pipe(
            retry(2),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => new Error(error.message));
            })
        );
    }

    addClient(client: Client): Observable<Client> {
        return this.http.post<Client>(this.usersUrl, client).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(() => new Error(error.message));
            })
        )
    }

    getClientByEmail(email: string): Observable<boolean> {
        return this.http.get<Client[]>(this.usersUrl).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(() => new Error(error.message));
            }),
            map(clients => clients.some(client => client.Email === email))
        );
    }

    getClient(email: string, password: string): Observable<Client | undefined> {
        return this.http.get<Client[]>(this.usersUrl).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(() => new Error(error.message));
            }),
            map(clients => clients.find(client => client.Email === email && client.Password === password))
        );
    }
}