import { useParams } from 'react-router-dom'
import { useGetUserByIdQuery, useGetPostsByUserIdQuery, useUpdateUserMutation, useDeletePostMutation, useUpdatePostMutation } from '../features/api/api-slice'
import { Spin, Typography, Divider, Form, message } from 'antd'
import { useState, useEffect } from 'react'
import { User as UserType } from '../types/UserType'
import { Post } from '../types/PostType'
import UserProfile from '../components/UserProfile'
import PostList from '../components/PostList'

const { Title } = Typography

export default function UserPage() {
    const { id } = useParams()
    const userId = Number(id)
    const [userForm] = Form.useForm()
    const [postForm] = Form.useForm()

    // Data fetching
    const { data: userData, isFetching: isFetchingUser } = useGetUserByIdQuery(userId)
    const { data: postsData = [], isFetching: isFetchingPosts } = useGetPostsByUserIdQuery(userId)
    
    // State
    const [user, setUser] = useState<UserType | null>(null)
    const [posts, setPosts] = useState<Post[]>([])
    const [isEditingUser, setIsEditingUser] = useState(false)
    const [userHasChanges, setUserHasChanges] = useState(false)
    const [originalUserValues, setOriginalUserValues] = useState<UserType | null>(null)
    
    const [editingPostId, setEditingPostId] = useState<number | null>(null)
    const [postHasChanges, setPostHasChanges] = useState(false)
    const [originalPostValues, setOriginalPostValues] = useState<Post | null>(null)
    
    // Mutations
    const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation()
    const [updatePost, { isLoading: isUpdatingPost }] = useUpdatePostMutation()
    const [deletePost, { isLoading: isDeletingPost }] = useDeletePostMutation()
    
    // Effects
    useEffect(() => {
        if (userData) {
            setUser(userData)
        }
    }, [userData])
    
    useEffect(() => {
        if (postsData.length > 0) {
            setPosts(postsData)
        }
    }, [postsData])
    
    useEffect(() => {
        if (isEditingUser && user) {
            userForm.setFieldsValue(user)
        }
    }, [isEditingUser, user, userForm])
    
    // User handlers
    const handleUserEdit = () => {
        if (!user) return
        const userCopy = { ...user, address: { ...user.address } }
        setOriginalUserValues(userCopy)
        setIsEditingUser(true)
    }
    
    const handleUserUpdate = async (values: Partial<UserType>) => {
        if (!user) return
        
        try {
            const updatedUser = {
                ...user,
                ...values,
                address: {
                    ...user.address,
                    ...values.address,
                },
            }
            await updateUser(updatedUser).unwrap()
            setUser(updatedUser)
            userForm.setFieldsValue(updatedUser)
            setUserHasChanges(false)
            setIsEditingUser(false)
            setOriginalUserValues(null)
            message.success('User updated successfully')
        } catch {
            message.error('Failed to update user')
        }
    }
    
    const handleUserValuesChange = () => {
        const current = userForm.getFieldsValue() as Record<string, unknown>

        if (!originalUserValues) {
            setUserHasChanges(false)
            return
        }

        const simpleFieldsChanged = ['name', 'username', 'email'].some(
            (key) => current[key] !== originalUserValues[key as keyof UserType]
        )

        const addressFieldsChanged = ['street', 'suite', 'city', 'zipcode'].some(
            (key) => {
                const currentAddress = current.address as Record<string, unknown> | undefined;
                return currentAddress?.[key] !== originalUserValues.address?.[key as keyof typeof originalUserValues.address];
            }
        )

        setUserHasChanges(simpleFieldsChanged || addressFieldsChanged)
    }
    
    const handleUserRevert = () => {
        if (originalUserValues) {
            userForm.setFieldsValue(originalUserValues)
            setUserHasChanges(false)
        }
    }
    
    const handleUserCancel = () => {
        userForm.resetFields()
        setIsEditingUser(false)
        setUserHasChanges(false)
        setOriginalUserValues(null)
    }
    
    // Post handlers
    const handlePostEdit = (post: Post) => {
        const postCopy = { ...post }
        setOriginalPostValues(postCopy)
        setEditingPostId(post.id)
        postForm.setFieldsValue(post)
    }
    
    const handlePostUpdate = async (values: Partial<Post>) => {
        if (!editingPostId) return
        
        const postToUpdate = posts.find(p => p.id === editingPostId)
        if (!postToUpdate) return
        
        try {
            const updatedPost = {
                ...postToUpdate,
                ...values,
            }
            await updatePost(updatedPost).unwrap()
            setPosts(posts.map(p => p.id === editingPostId ? updatedPost : p))
            setEditingPostId(null)
            setPostHasChanges(false)
            setOriginalPostValues(null)
            message.success('Post updated successfully')
        } catch {
            message.error('Failed to update post')
        }
    }
    
    const handlePostValuesChange = () => {
        const current = postForm.getFieldsValue() as Record<string, unknown>

        if (!originalPostValues) {
            setPostHasChanges(false)
            return
        }

        const fieldsChanged = ['title', 'body'].some(
            (key) => current[key] !== originalPostValues[key as keyof Post]
        )

        setPostHasChanges(fieldsChanged)
    }
    
    const handlePostCancel = () => {
        postForm.resetFields()
        setEditingPostId(null)
        setPostHasChanges(false)
        setOriginalPostValues(null)
    }
    
    const handlePostRevert = () => {
        if (originalPostValues) {
            postForm.setFieldsValue(originalPostValues)
            setPostHasChanges(false)
        }
    }
    
    const handleDeletePost = async (post: Post) => {
        try {
            await deletePost(post.id).unwrap()
            setPosts(posts.filter(p => p.id !== post.id))
            message.success('Post deleted successfully')
        } catch {
            message.error('Failed to delete post')
        }
    }
    
    // Loading and error states
    if (isFetchingUser) {
        return (
            <div style={{ textAlign: 'center', padding: '24px' }}>
                <Spin size="large" />
            </div>
        )
    }

    if (!user) {
        return (
            <div style={{ padding: '24px' }}>
                <Title level={3}>User not found</Title>
            </div>
        )
    }

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* User Profile */}
            <UserProfile 
                user={user}
                isEditing={isEditingUser}
                form={userForm}
                hasChanges={userHasChanges}
                isLoading={isUpdatingUser}
                onEdit={handleUserEdit}
                onUpdate={handleUserUpdate}
                onCancel={handleUserCancel}
                onRevert={handleUserRevert}
                onChange={handleUserValuesChange}
            />
            
            <Divider />
            
            {/* Posts List */}
            <PostList 
                posts={posts}
                isFetchingPosts={isFetchingPosts}
                form={postForm}
                editingPostId={editingPostId}
                isUpdating={isUpdatingPost}
                isDeleting={isDeletingPost}
                postHasChanges={postHasChanges}
                onEdit={handlePostEdit}
                onUpdate={handlePostUpdate}
                onDelete={handleDeletePost}
                onRevert={handlePostRevert}
                onCancel={handlePostCancel}
                onChange={handlePostValuesChange}
            />
        </div>
    )
}