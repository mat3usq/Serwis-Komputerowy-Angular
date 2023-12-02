import { Injectable } from '@angular/core';
import { Client } from '../models/Client';
import { User } from '../models/User';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map, filter } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private usersUrl = 'api/clients/';
    private static generalId = 3;
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
        console.log(client);
        const data = {
            id: null,
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            password: client.password,
            phoneNumber: client.phoneNumber
        }
        return this.http.post<Client>(this.usersUrl, data)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(() => new Error(error.message));
                })
            );
    }

    isEmailExists(email: string): Observable<boolean> {
        return this.http.get<Client[]>(this.usersUrl).pipe(
            map((clients) => clients.map(({ email }) => new String(email))),
            map((actualEmailsInstances) => {
                return actualEmailsInstances.some(registerdEmail => registerdEmail == email);
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => new Error(error.message));
            })

        );
    }

    getClient(email: string, password: string): Observable<Client | undefined> {
        return this.http.get<Client[]>(this.usersUrl).pipe(
            map((clients) => clients.map(({ id, firstName, lastName, email, password, phoneNumber }) => new Client(id, firstName, lastName, email, password, phoneNumber))),
            map((actualClientInstances) => {
                console.log(actualClientInstances);
                return actualClientInstances.find(client => client.Email === email && client.Password === password);
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => new Error(error.message));
            })
        );
    }
}