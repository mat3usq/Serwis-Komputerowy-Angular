import { Injectable } from '@angular/core';
import { Client } from '../models/Client';
import { User } from '../models/User';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, map, filter } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Serviceman } from 'src/models/Serviceman';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private clientslocalStorageKey = 'clients';
  private servicemanlocalStorageKey = 'serviceman';
  private loggedClientlocalStorageKey = 'logged';

  constructor() {
    // const clients: Client[] = [];
    // const servicemans: Serviceman[] = [];
    
    // localStorage.setItem(this.servicemanlocalStorageKey, JSON.stringify(servicemans));    
     //localStorage.setItem(this.clientslocalStorageKey, JSON.stringify(clients));
    // console.log(this.getClientsFromLocalStorage());
    // console.log(this.getServicemanFromLocalStorage());




    const client1 = new Client(0, 'John', 'Doe', 'a', 'a', '111111111')
    const client2 = new Client(0, 'John', 'Doe', 'b', 'b', '111111111')
    const serviceman = new Serviceman(5, 'cos', 'ktos', 'f', 'f', '111111111')
    const serviceman2 = new Serviceman(45645, 'cos', 'ktos', 'h', 'h', '111111111')

    if(this.getServicemanFromLocalStorage().length == 0){
      this.addServiceman(serviceman);
    }
    if(this.getServicemanFromLocalStorage().length == 1){
      this.addServiceman(serviceman2);
    }
    
    if(this.getClientsFromLocalStorage().length == 0) {
      this.addClient(client1);
    }
    if(this.getClientsFromLocalStorage().length == 1) {
      this.addClient(client2);
    }
    console.log(this.getClientsFromLocalStorage());
    console.log(this.getServicemanFromLocalStorage());
    
  }

  isEmailExists(email: string): Observable<boolean> {
    const clients: Client[] = this.getClientsFromLocalStorage();
    const servicemans: Serviceman[] = this.getServicemanFromLocalStorage();
    const emails: string[] = clients.map((client) => client['email']);
    const servicemanemails: string[] = servicemans.map((serviceman) => serviceman['email']);
    const table: string[] = [...emails,...servicemanemails];
    return new Observable<boolean>((observer) => {
      observer.next(table.includes(email));
      observer.complete();
    });
  }

  isServiceman(): boolean {
    const userId = this.getLoggedClient();
    const servicemans: Serviceman[] = this.getServicemanFromLocalStorage();
  
    return servicemans.some(serviceman => serviceman['id'] === userId);
  }
  

  addLoggedClient (userId: number){
    localStorage.setItem(this.loggedClientlocalStorageKey, JSON.stringify(userId));
  }
  getLoggedClient(): number{
    const clientsJSON = localStorage.getItem(this.loggedClientlocalStorageKey);
    return clientsJSON ? JSON.parse(clientsJSON) : [];
  }

  getClient(email: string, password: string): Observable<Client | undefined> {
    const clients: Client[] = this.getClientsFromLocalStorage();
    const serviceman: Serviceman[] = this.getServicemanFromLocalStorage();
    const foundClient = clients.find(
      (client) => client['email'] === email && client['password'] === password
    );
    const foundServiceman = serviceman.find(
      (serviceman) => serviceman['email'] === email && serviceman['password'] === password
    );
    return new Observable<Client | undefined>((observer) => {
      observer.next(foundClient);
      observer.next(foundServiceman);
      observer.complete();
    });
  }

  addClient(client: Client): Observable<Client> {
    const clients: Client[] = this.getClientsFromLocalStorage();
    const serviceman: Serviceman[] = this.getServicemanFromLocalStorage();
    client['id'] = clients.length + serviceman.length; // Temporary ID assignment
    clients.push(client);
    localStorage.setItem(this.clientslocalStorageKey, JSON.stringify(clients));
    return new Observable<Client>((observer) => {
      observer.next(client);
      observer.complete();
    }).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  addServiceman(serviceman: Serviceman): Observable<Client> {
    const clients: Client[] = this.getClientsFromLocalStorage();
    const servicemans: Serviceman[] = this.getServicemanFromLocalStorage();
    serviceman['id'] = clients.length + servicemans.length; // Temporary ID assignment
    servicemans.push(serviceman);
    localStorage.setItem(this.servicemanlocalStorageKey, JSON.stringify(servicemans));

    return new Observable<Client>((observer) => {
      observer.next(serviceman);
      observer.complete();
    }).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  private getClientsFromLocalStorage(): Client[] {
    const clientsJSON = localStorage.getItem(this.clientslocalStorageKey);
    return clientsJSON ? JSON.parse(clientsJSON) : [];
  }
  private getServicemanFromLocalStorage(): Client[] {
    const clientsJSON = localStorage.getItem(this.servicemanlocalStorageKey);
    return clientsJSON ? JSON.parse(clientsJSON) : [];
  }
}
