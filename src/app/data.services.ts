import { Injectable } from '@angular/core';
import { Client } from '../models/Client';
import { User } from '../models/User';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
    providedIn: 'root'
})
export class DataService implements InMemoryDbService {
    constructor() { }
    createDb() {
        const clients: Client[] = [
            new Client('John', 'Doe', 'john.doe@email.com', 'password123', '111111111', 0),
            new Client('Alice', 'Smith', 'alice.smith@email.com', 'securepass', '222222222', 1),
            new Client('Bob', 'Johnson', 'bob.johnson@email.com', 'secret123', '333333333', 2),
        ];
        return {
            clients,
            servicemen: [
                {
                    "userId": 0,
                    "firstName": "Jane",
                    "lastName": "Doe",
                    "email": "jane.doe@email.com",
                    "password": "pass123",
                    "phoneNumber": "444-555-6666"
                },
                {
                    "userId": 1,
                    "firstName": "Eve",
                    "lastName": "Taylor",
                    "email": "eve.taylor@email.com",
                    "password": "topsecret",
                    "phoneNumber": "777-888-9999"
                },
                {
                    "userId": 2,
                    "firstName": "Charlie",
                    "lastName": "Brown",
                    "email": "charlie.brown@email.com",
                    "password": "peanuts123",
                    "phoneNumber": "123-456-7890"
                }
            ],
            reports: [
                {
                    reportId: 0,
                    description: 'Opis raportu 0',
                    priority: 'high',
                    status: 'solved',
                    startDate: '2023-11-26',
                    userId: '0',

                },
                {
                    reportId: 1,
                    description: 'Opis raportu 1',
                    priority: 'normal',
                    status: 'inRealization',
                    startDate: '2023-11-27',
                    userId: '1',

                },
                {
                    reportId: 2,
                    description: 'Opis raportu 2',
                    priority: 'normal',
                    status: 'inRealization',
                    startDate: '2023-11-28',
                    userId: '2',

                },
                {
                    reportId: 3,
                    description: 'Opis raportu 3',
                    priority: 'high',
                    status: 'solved',
                    startDate: '2023-11-29',
                    userId: '0',

                },
                {
                    reportId: 4,
                    description: 'Opis raportu 4',
                    priority: 'normal',
                    status: 'solved',
                    startDate: '2023-11-26',
                    userId: '1',

                },
                {
                    reportId: 5,
                    description: 'Opis raportu 5',
                    priority: 'high',
                    status: 'new',
                    startDate: '2023-11-27',
                    userId: '2',
                }
            ]
        };
    };
}