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
    http.get('https://jsonplaceholder.typicode.com/todos', () => {
        return HttpResponse.json([
            { id: 1, title: 'Task One', completed: false, userId: 1 },
            { id: 2, title: 'Task Two', completed: true, userId: 1 },
            { id: 3, title: 'Task Three', completed: false, userId: 2 },
            { id: 4, title: 'Task Four', completed: true, userId: 2 },
            { id: 5, title: 'Task Five', completed: false, userId: 3 },
            { id: 6, title: 'Task Six', completed: true, userId: 3 },
            { id: 7, title: 'Task Seven', completed: false, userId: 4 },
            { id: 8, title: 'Task Eight', completed: true, userId: 4 },
            { id: 9, title: 'Task Nine', completed: false, userId: 5 },
            { id: 10, title: 'Task Ten', completed: true, userId: 5 },
            { id: 11, title: 'Task Eleven', completed: false, userId: 6 },
            { id: 12, title: 'Task Twelve', completed: true, userId: 6 },
        ]);
    }),
    http.put('https://jsonplaceholder.typicode.com/todos/:id', async ({ request, params }) => {
        const id = params.id;
        const updatedTodo = await request.json() as { title: string; completed: boolean; userId: number };
        return HttpResponse.json({ ...updatedTodo, id: Number(id) });
    }),
    http.get('https://jsonplaceholder.typicode.com/users/1', () => {
        return HttpResponse.json(user);
    }),
    http.get('https://jsonplaceholder.typicode.com/posts', async ({ request }) => {
        const url = new URL(request.url)
        const userId = url.searchParams.get('userId')
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100))
        
        if (userId === '1') {
            return HttpResponse.json([
                { id: 1, title: 'Post One', body: 'Body One', userId: 1 },
                { id: 2, title: 'Post Two', body: 'Body Two', userId: 1 },
                { id: 3, title: 'Post Three', body: 'Body Three', userId: 1 },
                { id: 4, title: 'Post Four', body: 'Body Four', userId: 1 },
                { id: 5, title: 'Post Five', body: 'Body Five', userId: 1 },
                { id: 6, title: 'Post Six', body: 'Body Six', userId: 1 },
                { id: 7, title: 'Post Seven', body: 'Body Seven', userId: 1 },
                { id: 8, title: 'Post Eight', body: 'Body Eight', userId: 1 },
                { id: 9, title: 'Post Nine', body: 'Body Nine', userId: 1 },
                { id: 10, title: 'Post Ten', body: 'Body Ten', userId: 1 },
            ]);
        }
        
        return HttpResponse.json([]);
    }),
    http.put('https://jsonplaceholder.typicode.com/posts/1', () => {
        return HttpResponse.json({ id: 1, title: 'Updated Post', body: 'Updated Body', userId: 1 })
    }),
    
];
