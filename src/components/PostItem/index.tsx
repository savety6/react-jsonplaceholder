import { Card, Typography, Space, Button, Form, Input } from 'antd'
import { Edit, Trash2 } from 'lucide-react'
import { Post } from '../../types/PostType'
import { FormInstance } from 'antd/lib/form'

const { Text, Paragraph } = Typography

interface PostItemProps {
    post: Post
    isEditing: boolean
    form: FormInstance
    hasChanges: boolean
    isLoading: boolean
    onEdit: () => void
    onUpdate: (values: Partial<Post>) => void
    onDelete: () => void
    onCancel: () => void
    onRevert: () => void
    onChange: () => void
}

export default function PostItem({
    post,
    isEditing,
    form,
    hasChanges,
    isLoading,
    onEdit,
    onUpdate,
    onDelete,
    onCancel,
    onRevert,
    onChange
}: PostItemProps) {
    return (
        <Card
            className="post-item-card"
            key={post.id}
            title={isEditing ? 
                "Edit Post" : 
                <Text strong style={{ fontSize: '18px' }}>{post.title}</Text>
            }
            extra={!isEditing ? (
                <Space>
                    <Button 
                        icon={<Edit size={16} />} 
                        onClick={onEdit}
                    >
                        Edit
                    </Button>
                    <Button 
                        danger 
                        icon={<Trash2 size={16} />} 
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                </Space>
            ) : null}
            style={{ marginBottom: '16px' }}
        >
            {isEditing ? (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onUpdate}
                    onValuesChange={onChange}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                            { required: true, message: 'Please input title!' },
                            { min: 3, message: 'Title must be at least 3 characters!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="body"
                        label="Content"
                        rules={[
                            { required: true, message: 'Please input content!' },
                            { min: 10, message: 'Content must be at least 10 characters!' }
                        ]}
                    >
                        <Input.TextArea rows={6} />
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
            ) : (
                <Paragraph style={{ marginTop: '8px', whiteSpace: 'pre-wrap' }}>
                    {post.body}
                </Paragraph>
            )}
        </Card>
    )
} 