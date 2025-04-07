import { useParams } from 'react-router-dom'
import { useGetUserByIdQuery } from '../features/api/api-slice'

interface User {
    id: number
    name: string
    email: string
    phone: string
    website: string
}

export default function User() {
    const { id } = useParams()
    const { data: user, isFetching } = useGetUserByIdQuery(Number(id))

    return (
        <div>
            {isFetching ? <p>Loading...</p> : (
                <>
                    <h1>{user?.name}</h1>
                    <p>{user?.email}</p>
                    <p>{user?.phone}</p>
                    <p>{user?.website}</p>
                </>
            )}
        </div>
    )
}