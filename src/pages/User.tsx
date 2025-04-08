import { useParams } from 'react-router-dom'
import { useGetUserByIdQuery } from '../features/api/api-slice'
import { Spin } from 'antd'

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
            {isFetching ?
                <div style={{ textAlign: 'center', padding: '24px' }}>
                    <Spin size="large" />
                </div> : (
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