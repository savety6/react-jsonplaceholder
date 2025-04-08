import { Typography } from 'antd'
import { User as UserType } from '../../types/UserType'

const { Text } = Typography

export default function UserDetailsView({ user }: { user: UserType }) {
    return (
        <>
            <div style={{ marginBottom: '16px' }}>
                <Text type="secondary">Username:</Text>
                <div style={{ marginTop: '4px' }}>{user.username}</div>
            </div>
            <div style={{ marginBottom: '16px' }}>
                <Text type="secondary">Email:</Text>
                <div style={{ marginTop: '4px' }}>{user.email}</div>
            </div>
            <div style={{ marginBottom: '16px' }}>
                <Text type="secondary">Address:</Text>
                <div style={{ marginTop: '4px' }}>
                    {user.address.street}, {user.address.suite}<br />
                    {user.address.city}, {user.address.zipcode}
                </div>
            </div>
        </>
    )
}
