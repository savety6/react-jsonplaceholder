// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('/api/data', () => {
        return Response.json({ data: 'mocked data' });
    }),
    // Add more handlers as needed
    http.get('https://jsonplaceholder.typicode.com/users', ({  }) => {
        return HttpResponse.json([
            { id: 1, name: 'User One' },
            { id: 2, name: 'User Two' },
            { id: 3, name: 'User Three' },
            { id: 4, name: 'User Four' },
            { id: 5, name: 'User Five' },
            { id: 6, name: 'User Six' },
            { id: 7, name: 'User Seven' },
            { id: 8, name: 'User Eight' },
            { id: 9, name: 'User Nine' },
            { id: 10, name: 'User Ten' },
            // Add more mock users as needed
        ]);
    }),
];
