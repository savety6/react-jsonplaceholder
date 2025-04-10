// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

const user = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
            lat: "-37.3159",
            lng: "81.1496"
        }
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets"
    }
}

export const handlers = [
    http.get('/api/data', () => {
        return Response.json({ data: 'mocked data' });
    }),
    // Add more handlers as needed
    http.get('https://jsonplaceholder.typicode.com/users', () => {
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
    http.get('https://jsonplaceholder.typicode.com/users/1', () => {
        return HttpResponse.json(user);
    }),
    http.get('https://jsonplaceholder.typicode.com/posts', ({ request }) => {
        const url = new URL(request.url)
        const userId = url.searchParams.get('userId')
        
        if (userId === '1') {
            return HttpResponse.json([
                { id: 1, title: 'Post One' },
                { id: 2, title: 'Post Two' },
                { id: 3, title: 'Post Three' },
            ]);
        }
        
        return HttpResponse.json([]);
    }),
];
