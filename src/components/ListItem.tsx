import { Collapse, Typography } from 'antd'
import { ChevronDown, User } from "lucide-react"
import { User as UserType } from '../types/UserType'

const { Text } = Typography
const { Panel } = Collapse

type Props = {
    user: UserType
}

export default function ListItem({ user }: Props) {
    const header = (
        <div className="list-item-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                    backgroundColor: '#f5f5f5',
                    padding: '8px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
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

    return (
        <Collapse 
            className="list-item"
            expandIcon={({ isActive }) => (
                <ChevronDown
                    style={{ 
                        transform: `rotate(${isActive ? 180 : 0}deg)`,
                        transition: 'transform 0.3s',
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        marginTop: '-12px'
                    }}
                />
            )}
            expandIconPosition="right"
        >
            <Panel 
                header={header}
                key="1"
                style={{ borderRadius: '8px' }}
            >
                <div style={{ padding: '16px' }}>
                    <div style={{ marginBottom: '16px' }}>
                        <Text type="secondary">Role:</Text>
                        <div style={{ marginTop: '4px' }}>User</div>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <Text type="secondary">Department:</Text>
                        <div style={{ marginTop: '4px' }}>Marketing</div>
                    </div>
                    <div>
                        <Text type="secondary">Phone:</Text>
                        <div style={{ marginTop: '4px' }}>{user.phone}</div>
                    </div>
                </div>
            </Panel>
        </Collapse>
    )
}