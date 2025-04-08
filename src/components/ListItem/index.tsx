import { Collapse, Button, Space, message, Form } from 'antd'
import { ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { User as UserType } from '../../types/UserType'
import { useDeleteUserMutation, useUpdateUserMutation } from '../../features/api/api-slice'

import UserHeader from './UserHeader'
import UserDetailsView from './UserDetailsView'
import UserEditForm from './UserEditForm'

const { Panel } = Collapse

interface Props {
    user: UserType
    onUserDeleted?: (userId: number) => void
}

export default function ListItem({ user, onUserDeleted }: Props) {
    const [form] = Form.useForm()
    const [isEditing, setIsEditing] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)
    const [localUser, setLocalUser] = useState(user)
    const [originalValues, setOriginalValues] = useState<UserType | null>(null)

    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

    useEffect(() => {
        if (isEditing) {
            form.setFieldsValue(localUser)
        }
    }, [isEditing, localUser, form])

    const handleUpdateUser = async (values: Partial<UserType>) => {
        try {
            const updatedUser = {
                ...localUser,
                ...values,
                address: {
                    ...localUser.address,
                    ...values.address,
                },
            }
            await updateUser(updatedUser).unwrap()
            setLocalUser(updatedUser)
            form.setFieldsValue(updatedUser)
            setHasChanges(false)
            setIsEditing(false)
            setOriginalValues(null)
            message.success('User updated successfully')
        } catch {
            message.error('Failed to update user')
        }
    }

    const handleDeleteUser = async () => {
        try {
            await deleteUser(localUser.id).unwrap()
            if (onUserDeleted) {
                onUserDeleted(localUser.id)
            }
            message.success('User deleted successfully')
        } catch {
            message.error('Failed to delete user')
        }
    }

    const handleCancel = () => {
        form.resetFields()
        setIsEditing(false)
        setHasChanges(false)
        setOriginalValues(null)
    }

    const handleRevert = () => {
        if (originalValues) {
            form.setFieldsValue(originalValues)
            setHasChanges(false)
        }
    }

    const handleValuesChange = () => {
        const current = form.getFieldsValue() as Record<string, unknown>

        if (!originalValues) {
            setHasChanges(false)
            return
        }

        const simpleFieldsChanged = ['name', 'username', 'email'].some(
            (key) => current[key] !== originalValues[key as keyof UserType]
        )

        const addressFieldsChanged = ['street', 'suite', 'city', 'zipcode'].some(
            (key) => {
                const currentAddress = current.address as Record<string, unknown> | undefined;
                return currentAddress?.[key] !== originalValues.address?.[key as keyof typeof originalValues.address];
            }
        )

        setHasChanges(simpleFieldsChanged || addressFieldsChanged)
    }

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
                        marginTop: '-12px',
                    }}
                />
            )}
            expandIconPosition="right"
        >
            <Panel header={<UserHeader user={localUser} />} key={localUser.id.toString()} style={{ borderRadius: '8px' }}>
                <div style={{ padding: '16px' }}>
                    {isEditing ? (
                        <UserEditForm
                            form={form}
                            initialUser={localUser}
                            onSubmit={(values) => {
                                void handleUpdateUser(values);
                            }}
                            onCancel={handleCancel}
                            onRevert={handleRevert}
                            isLoading={isUpdating}
                            hasChanges={hasChanges}
                            onChange={handleValuesChange}
                        />
                    ) : (
                        <>
                            <UserDetailsView user={localUser} />
                            <Space>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        const userCopy = { ...localUser, address: { ...localUser.address } };
                                        setOriginalValues(userCopy)
                                        setIsEditing(true)
                                        form.setFieldsValue(localUser)
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    danger 
                                    onClick={() => {
                                        void handleDeleteUser();
                                    }} 
                                    loading={isDeleting}
                                >
                                    Delete
                                </Button>
                            </Space>
                        </>
                    )}
                </div>
            </Panel>
        </Collapse>
    )
}
