import { Form, Input, Button, Space } from 'antd'
import { User as UserType } from '../../types/UserType'
import { FormInstance } from 'antd/lib/form'

interface Props {
    form: FormInstance
    initialUser: UserType
    onSubmit: (values: Partial<UserType>) => void
    onCancel: () => void
    onRevert: () => void
    isLoading: boolean
    hasChanges: boolean
    onChange: () => void
}

export default function UserEditForm({
    form,
    onSubmit,
    onCancel,
    onRevert,
    isLoading,
    hasChanges,
    onChange,
}: Props) {
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onSubmit}
            onValuesChange={onChange}
        >
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    { required: true, message: 'Please input name!' },
                    { min: 2, message: 'Name must be at least 2 characters!' }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="username"
                label="Username"
                rules={[
                    { required: true, message: 'Please input username!' },
                    { min: 3, message: 'Username must be at least 3 characters!' },
                    { 
                        pattern: /^[a-zA-Z0-9_]+$/, 
                        message: 'Username must contain only letters, numbers, or underscores!' 
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[
                    { required: true, message: 'Please input email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name={['address', 'street']}
                label="Street"
                rules={[
                    { required: true, message: 'Please input street!' },
                    { min: 3, message: 'Street must be at least 3 characters!' }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name={['address', 'suite']}
                label="Suite"
                rules={[{ required: true, message: 'Please input suite!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name={['address', 'city']}
                label="City"
                rules={[
                    { required: true, message: 'Please input city!' },
                    { min: 2, message: 'City must be at least 2 characters!' },
                    {
                        pattern: /^[A-ZА-Я]/, 
                        message: 'City must start with a capital letter!'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item 
                name={['address', 'zipcode']} 
                label="Zipcode"
                rules={[
                    { 
                        pattern: /^[\d-]+$/, 
                        message: 'Zipcode must contain only digits and dashes!' 
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Space>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    disabled={!hasChanges}
                >
                    Save
                </Button>
                <Button onClick={onRevert} disabled={!hasChanges}>
                    Revert
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
            </Space>
        </Form>
    )
}
