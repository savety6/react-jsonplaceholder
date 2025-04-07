import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface User {
    id: number
    name: string
    email: string
    phone: string
    website: string
}

export default function Dashboard() {
    const [users, setUsers] = useState<User[]>([])
    
    useEffect(() => {
        const fetchUsers = async () => {    
            const res = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = (await res.json()) as User[]
            setUsers(data)
        }
        void fetchUsers()
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