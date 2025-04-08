import { useState, useEffect } from 'react'
import { Table, Typography, Space, Select, Input, Switch, Tag, Button, Form, message } from 'antd'
import type { TableProps } from 'antd'
import { Search, FilterX } from 'lucide-react'
import { useGetTodosQuery, useGetUsersQuery, useUpdateTodoMutation } from '../features/api/api-slice'
import { Todo } from '../types/TodoType'


const { Title, Text } = Typography
const { Option } = Select

export default function Tasks() {
    // States for filtering and pagination
    const [searchTitle, setSearchTitle] = useState('')
    const [statusFilter, setStatusFilter] = useState<boolean | null>(null)
    const [userFilter, setUserFilter] = useState<number | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize] = useState(10)
    
    // Local state for todos to keep track of status changes
    const [localTodos, setLocalTodos] = useState<Todo[]>([])
    
    // Get todos and users from API
    const { data: todosData = [], isLoading: isLoadingTodos } = useGetTodosQuery()
    const { data: usersData = [], isLoading: isLoadingUsers } = useGetUsersQuery()
    
    // Update todo mutation
    const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation()
    
    // Update local todos state whenever API data changes
    useEffect(() => {
        if (todosData.length > 0) {
            setLocalTodos(todosData)
        }
    }, [todosData])
    
    // Function to handle status toggle
    const handleStatusToggle = async (todoId: number, completed: boolean) => {
        // Find the todo in local state
        const todoToUpdate = localTodos.find(todo => todo.id === todoId)
        if (!todoToUpdate) return
        
        try {
            // Optimistically update local state
            setLocalTodos(prevTodos => 
                prevTodos.map(todo => 
                    todo.id === todoId ? { ...todo, completed } : todo
                )
            )
            
            // Update on server
            await updateTodo({
                ...todoToUpdate,
                completed
            }).unwrap()
            
            message.success('Task status updated successfully')
        } catch (error) {
            // Revert local state if server update fails
            setLocalTodos(prevTodos => 
                prevTodos.map(todo => 
                    todo.id === todoId ? { ...todo, completed: !completed } : todo
                )
            )
            message.error('Failed to update task status')
        }
    }
    
    // Filter todos based on search criteria
    const filteredTodos = localTodos.filter(todo => {
        const matchesTitle = todo.title.toLowerCase().includes(searchTitle.toLowerCase())
        const matchesStatus = statusFilter === null || todo.completed === statusFilter
        const matchesUser = userFilter === null || todo.userId === userFilter
        
        return matchesTitle && matchesStatus && matchesUser
    })
    
    // Reset filters
    const resetFilters = () => {
        setSearchTitle('')
        setStatusFilter(null)
        setUserFilter(null)
        setCurrentPage(1)
    }
    
    // Column definitions for the table
    const columns: TableProps<Todo>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 70,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <Text>{text}</Text>,
        },
        {
            title: 'User',
            dataIndex: 'userId',
            key: 'userId',
            width: 150,
            render: (userId) => {
                const user = usersData.find(user => user.id === userId)
                return <Text>{user ? user.name : `User ${userId}`}</Text>
            },
        },
        {
            title: 'Status',
            dataIndex: 'completed',
            key: 'completed',
            width: 120,
            render: (completed) => (
                <Tag color={completed ? 'success' : 'warning'}>
                    {completed ? 'Completed' : 'Pending'}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: 120,
            render: (_, record) => (
                <Switch
                    checked={record.completed}
                    onChange={(checked) => handleStatusToggle(record.id, checked)}
                    loading={isUpdating && localTodos.find(t => t.id === record.id)?.completed !== record.completed}
                    checkedChildren="Done"
                    unCheckedChildren="Todo"
                />
            ),
        },
    ]
    
    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Tasks</Title>
            
            {/* Filters */}
            <Space style={{ marginBottom: '24px' }} direction="vertical" size="middle" className="filters-container">
                <Form layout="inline">
                    <Form.Item label="Search by Title">
                        <Input
                            placeholder="Search tasks..."
                            value={searchTitle}
                            onChange={e => setSearchTitle(e.target.value)}
                            prefix={<Search size={16} />}
                            style={{ width: 250 }}
                            allowClear
                        />
                    </Form.Item>
                    
                    <Form.Item label="Status">
                        <Select
                            style={{ width: 150 }}
                            placeholder="Filter by status"
                            value={statusFilter}
                            onChange={value => setStatusFilter(value)}
                            allowClear
                        >
                            <Option value={true}>Completed</Option>
                            <Option value={false}>Pending</Option>
                        </Select>
                    </Form.Item>
                    
                    <Form.Item label="User">
                        <Select
                            style={{ width: 200 }}
                            placeholder="Filter by user"
                            value={userFilter}
                            onChange={value => setUserFilter(value)}
                            loading={isLoadingUsers}
                            allowClear
                        >
                            {usersData.map(user => (
                                <Option key={user.id} value={user.id}>{user.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    
                    <Form.Item>
                        <Button 
                            icon={<FilterX size={16} />} 
                            onClick={resetFilters}
                            disabled={!searchTitle && statusFilter === null && userFilter === null}
                        >
                            Reset Filters
                        </Button>
                    </Form.Item>
                </Form>
                
                <div>
                    <Text type="secondary">
                        Showing {filteredTodos.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} - {Math.min(currentPage * pageSize, filteredTodos.length)} of {filteredTodos.length} tasks
                    </Text>
                </div>
            </Space>
            
            {/* Tasks Table */}
            <Table 
                dataSource={filteredTodos}
                columns={columns}
                rowKey="id"
                loading={isLoadingTodos}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    onChange: (page) => setCurrentPage(page),
                    showSizeChanger: false,
                    showTotal: (total) => `Total ${total} items`,
                }}
                bordered
                className="task-table"
            />
        </div>
    )
}