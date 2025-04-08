import { Form, Input, Button, Space } from 'antd'
import { User as UserType } from '../../types/UserType'

type Props = {
    form: any
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
    initialUser,
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
            initialValues={initialUser}
        >
            <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="username"
                label="Username"
                rules={[
                    { required: true, message: 'Please input username!' },
                    { min: 3, message: 'Username must be at least 3 characters!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[
                    { required: true, message: 'Please input email!' },
                    { type: 'email', message: 'Please enter a valid email!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name={['address', 'street']}
                label="Street"
                rules={[
                    { required: true, message: 'Please input street!' },
                    { min: 3, message: 'Street must be at least 3 characters!' },
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
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item name={['address', 'zipcode']} label="Zipcode">
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
