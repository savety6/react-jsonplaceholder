import { List, Spin, Typography } from 'antd'
import { useGetUsersQuery } from '../features/api/api-slice'
import ListItem from '../components/ListItem'

export default function Home() {
    const { data = [], isFetching } = useGetUsersQuery(16)

    return (
        <div style={{ padding: '24px' }}>
            <main>
                {isFetching ? (
                    <div style={{ textAlign: 'center', padding: '24px' }}>
                        <Spin size="large" />
                    </div>
                ) : (
                    <>
                        <Typography.Title level={2}>
                            Users ({data.length})
                        </Typography.Title>
                        <List
                            dataSource={data}
                            renderItem={user => (
                                <List.Item key={user.id} >
                                    <ListItem user={user} />
                                </List.Item>
                            )}
                        />
                    </>
                )}
            </main>
        </div>
    )
}