import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface User {
    id: number
    name: string
    email: string
    phone: string
    website: string
}

export default function User() {
    const { id } = useParams()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            const data = (await res.json()) as User
            setUser(data)
        }
        void fetchUser()
    }, [id])

    return (
        <div>
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
            <p>{user?.phone}</p>
            <p>{user?.website}</p>
        </div>
    )
}