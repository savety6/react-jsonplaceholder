import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type User = {
    id: number
    name: string
    email: string
    phone: string
    website: string
}

export default function Dashboard() {
    const [users, setUsers] = useState<User[]>([])
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {users.map(user => (
                    <Link to={`/users/${user.id}`}>
                        <li key={user.id}>
                            <h2>{user.name}</h2>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}