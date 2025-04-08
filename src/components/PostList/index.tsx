import { List, Typography, Spin, Modal } from 'antd'
import { useState } from 'react'
import { Post } from '../../types/PostType'
import PostItem from '../PostItem'
import { FormInstance } from 'antd/lib/form'

const { Title, Text } = Typography

interface PostListProps {
    posts: Post[]
    isFetchingPosts: boolean
    form: FormInstance
    editingPostId: number | null
    isUpdating: boolean
    isDeleting: boolean
    postHasChanges: boolean
    onEdit: (post: Post) => void
    onUpdate: (values: Partial<Post>) => void
    onDelete: (post: Post) => void
    onRevert: () => void
    onCancel: () => void
    onChange: () => void
}

export default function PostList({
    posts,
    isFetchingPosts,
    form,
    editingPostId,
    isUpdating,
    isDeleting,
    postHasChanges,
    onEdit,
    onUpdate,
    onDelete,
    onRevert,
    onCancel,
    onChange
}: PostListProps) {
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [postToDelete, setPostToDelete] = useState<Post | null>(null)

    const showDeleteConfirm = (post: Post) => {
        setPostToDelete(post)
        setDeleteModalVisible(true)
    }

    const handleDeleteConfirm = () => {
        if (postToDelete) {
            onDelete(postToDelete)
            setDeleteModalVisible(false)
            setPostToDelete(null)
        }
    }

    return (
        <div>
            <Title level={3}>User Posts ({posts.length})</Title>
            
            {isFetchingPosts ? (
                <div style={{ textAlign: 'center', padding: '24px' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <List
                    grid={{ 
                        gutter: 16, 
                        xs: 1, 
                        sm: 1, 
                        md: 1, 
                        lg: 1, 
                        xl: 1, 
                        xxl: 1 
                    }}
                    dataSource={posts}
                    renderItem={post => (
                        <List.Item>
                            <PostItem
                                post={post}
                                isEditing={editingPostId === post.id}
                                form={form}
                                hasChanges={postHasChanges}
                                isLoading={isUpdating}
                                onEdit={() => onEdit(post)}
                                onUpdate={onUpdate}
                                onDelete={() => showDeleteConfirm(post)}
                                onCancel={onCancel}
                                onRevert={onRevert}
                                onChange={onChange}
                            />
                        </List.Item>
                    )}
                />
            )}

            {/* Delete Confirmation Modal */}
            <Modal
                title="Confirm Delete"
                open={deleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={() => setDeleteModalVisible(false)}
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ loading: isDeleting, danger: true }}
            >
                <Text>Are you sure you want to delete this post?</Text>
                {postToDelete && (
                    <div style={{ marginTop: '8px' }}>
                        <Text strong>{postToDelete.title}</Text>
                    </div>
                )}
            </Modal>
        </div>
    )
} 