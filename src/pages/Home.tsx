import { Link } from 'react-router-dom'
import { useGetUsersQuery } from '../features/api/api-slice'
// import { User } from '../types/UserType'


export default function hOME() {
    const { data = [], isFetching, } = useGetUsersQuery(16)
    return (
        <div>
            <main>
                {isFetching && <p>Loading...</p>}
                <h1>Number of users: {data.length}</h1>
                <ul>
                    {data.map(user => (
                        <li key={user.id}>
                            <Link to={`/users/${user.id}`}>
                                <h2>{user.name}</h2>
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    )
}