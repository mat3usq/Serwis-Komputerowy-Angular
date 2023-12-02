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
            new Client(0,'John', 'Doe', 'a', 'a', '111111111'),
            new Client(1,'Alice', 'Smith', 'alice.smith@email.com', 'securepass', '222222222'),
            new Client(2, 'Bob', 'Johnson', 'bob.johnson@email.com', 'secret123', '333333333'),
        ];
        return {
            clients,
            reports: [
                {
                    id: 0,
                    description: 'Opis raportu 0',
                    priority: 'high',
                    status: 'solved',
                    startDate: '2023-11-26',
                    userId: '0',

                },
                {
                    id: 1,
                    description: 'Opis raportu 1',
                    priority: 'normal',
                    status: 'inRealization',
                    startDate: '2023-11-27',
                    userId: '1',

                },
                {
                    id: 2,
                    description: 'Opis raportu 2',
                    priority: 'normal',
                    status: 'inRealization',
                    startDate: '2023-11-28',
                    userId: '2',

                },
                {
                    id: 3,
                    description: 'Opis raportu 3',
                    priority: 'high',
                    status: 'solved',
                    startDate: '2023-11-29',
                    userId: '0',

                },
                {
                    id: 4,
                    description: 'Opis raportu 4',
                    priority: 'normal',
                    status: 'solved',
                    startDate: '2023-11-26',
                    userId: '1',

                },
                {
                    id: 5,
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