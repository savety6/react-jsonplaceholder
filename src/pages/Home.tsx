import { List, Spin, Typography } from 'antd'
import { useGetUsersQuery } from '../features/api/api-slice'
import ListItem from '../components/ListItem'
import { useState, useEffect } from 'react'
import { User } from '../types/UserType'

export default function Home() {
    const { data = [], isFetching, error } = useGetUsersQuery(16)
    const [users, setUsers] = useState<User[]>([])
    
    useEffect(() => {
        if (data.length > 0) {
            setUsers(data)
        }
    }, [data])
    
    const handleUserDeleted = (userId: number) => {
        setUsers(users.filter(user => user.id !== userId))
    }

    if (error || data.length === 0) {
        return <div role='status'>Error: Something went wrong</div>
    }
    return (
        <div style={{ padding: '24px' }}>
            <main>
                {isFetching ? (
                    <div style={{ textAlign: 'center', padding: '24px' }} role="status">
                        <Spin size="large" />
                    </div>
                ) : (
                    <>
                        <Typography.Title level={2}>
                            Users ({users.length})
                        </Typography.Title>
                        <List
                            dataSource={users}
                            renderItem={user => (
                                <List.Item key={user.id} >
                                    <ListItem user={user} onUserDeleted={handleUserDeleted} />
                                </List.Item>
                            )}
                        />
                    </>
                )}
            </main>
        </div>
    )
}