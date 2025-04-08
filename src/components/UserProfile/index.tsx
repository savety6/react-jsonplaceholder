import { Card, Typography, Button, Space } from 'antd'
import { Edit, Mail, Phone, Globe, Home } from 'lucide-react'
import { User } from '../../types/UserType'
import UserEditForm from '../ListItem/UserEditForm'
import { FormInstance } from 'antd/lib/form'

const { Title, Text } = Typography

interface UserProfileProps {
    user: User
    isEditing: boolean
    form: FormInstance
    hasChanges: boolean
    isLoading: boolean
    onEdit: () => void
    onUpdate: (values: Partial<User>) => void
    onCancel: () => void
    onRevert: () => void
    onChange: () => void
}

export default function UserProfile({
    user,
    isEditing,
    form,
    hasChanges,
    isLoading,
    onEdit,
    onUpdate,
    onCancel,
    onRevert,
    onChange
}: UserProfileProps) {
    return (
        <Card
            className="user-profile-card"
            title={<Title level={3}>User Profile</Title>}
            extra={!isEditing ? (
                <Button
                    type="primary"
                    icon={<Edit size={16} />}
                    onClick={onEdit}
                >
                    Edit Profile
                </Button>
            ) : null}
            style={{ marginBottom: '24px' }}
        >
            {isEditing ? (
                <UserEditForm
                    form={form}
                    initialUser={user}
                    onSubmit={onUpdate}
                    onCancel={onCancel}
                    onRevert={onRevert}
                    isLoading={isLoading}
                    hasChanges={hasChanges}
                    onChange={onChange}
                />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <Title level={4}>{user.name}</Title>
                        <Text type="secondary">@{user.username}</Text>
                    </div>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        <div style={{ minWidth: '250px' }}>
                            <Text type="secondary">Contact Information</Text>
                            <div style={{ marginTop: '8px' }}>
                                <Space direction="vertical">
                                    <Space>
                                        <Mail size={16} />
                                        <Text>{user.email}</Text>
                                    </Space>
                                    <Space>
                                        <Phone size={16} />
                                        <Text>{user.phone}</Text>
                                    </Space>
                                    <Space>
                                        <Globe size={16} />
                                        <Text>{user.website}</Text>
                                    </Space>
                                </Space>
                            </div>
                        </div>
                        
                        <div style={{ minWidth: '250px' }}>
                            <Text type="secondary">Address</Text>
                            <div style={{ marginTop: '8px' }}>
                                <Space>
                                    <Home size={16} />
                                    <Text>
                                        {user.address.street}, {user.address.suite}<br />
                                        {user.address.city}, {user.address.zipcode}
                                    </Text>
                                </Space>
                            </div>
                        </div>
                        
                        <div style={{ minWidth: '250px' }}>
                            <Text type="secondary">Company</Text>
                            <div style={{ marginTop: '8px' }}>
                                <Text strong>{user.company.name}</Text>
                                <div>
                                    <Text>{user.company.catchPhrase}</Text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    )
} 