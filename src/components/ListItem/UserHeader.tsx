import { Typography } from 'antd'
import { User } from 'lucide-react'
import { User as UserType } from '../../types/UserType'

const { Text } = Typography

export default function UserHeader({ user }: { user: UserType }) {
    return (
        <div className="list-item-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    backgroundColor: '#f5f5f5',
                    padding: '8px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <User size={24} color="#666" />
                </div>
                <div>
                    <Text strong style={{ display: 'block', fontSize: '16px' }}>{user.name}</Text>
                    <Text type="secondary" style={{ fontSize: '14px' }}>{user.email}</Text>
                </div>
            </div>
        </div>
    )
}
