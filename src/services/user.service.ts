import { Injectable } from '@angular/core';
import { Client } from '../models/Client';
import { User } from '../models/User';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService extends User {

  private usersUrl = 'api/clients/';

  constructor(private http: HttpClient) {
    super('', '', '', '', ''); // Initialize with empty values or provide default values
  }

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
      map((clients: any) => {
          const foundClient = clients.find((client: Client) => {
          return client['email'] === email && client['password'] === password;
        });

        return foundClient || undefined;
      })
    );
  }

}

//const user = new User("John", 'Doe', 'john.doe@email.com', 'password123', '111111111')
//console.log(`${user.Password} ${user.password}`)


// getClient(email: string, password: string): Observable<Client | undefined> {
//     return this.http.get<Client[]>(this.usersUrl).pipe(
//         catchError((error: HttpErrorResponse) => {
//             return throwError(() => new Error(error.message));
//         }),
//         map(clients => clients.find(client => client.Email === email && client.Password === password))
//     );
// }