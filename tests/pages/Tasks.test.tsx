import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import store from '../../src/context/store'
import Tasks from '../../src/pages/Tasks'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../../src/mocks/server'

const renderPage = () => {
    return render(
        <Provider store={store}>
            <MemoryRouter>
                <Tasks />
            </MemoryRouter>
        </Provider>
    )
}

describe('Tasks Page', () => {
    it('should render the Tasks page with title', async () => {
        renderPage()
        
        // Check if the page title is rendered
        expect(await screen.findByRole('heading', { name: /tasks/i })).toBeInTheDocument()
    })
    
    it('should display todos in a table after loading', async () => {
        renderPage()
        
        // Wait for the tasks to load
        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        })
        
        // Check if the table is rendered with tasks
        const table = await screen.findByRole('table')
        expect(table).toBeInTheDocument()
        
        // Check if at least one task is displayed
        expect(screen.getByText('Task One')).toBeInTheDocument()
        expect(screen.getByText('Task Two')).toBeInTheDocument()
    })
    
    it('should filter tasks by title', async () => {
        renderPage()
        
        // Wait for tasks to load
        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        })
        
        // Get the search input field
        const searchInput = screen.getByPlaceholderText('Search tasks...')
        
        // Type "Task One" in the search field
        await userEvent.clear(searchInput)
        await userEvent.type(searchInput, 'Task One')
        
        // Check if only "Task One" is displayed and "Task Two" is not
        expect(screen.getByText('Task One')).toBeInTheDocument()
        expect(screen.queryByText('Task Two')).not.toBeInTheDocument()
    })
    
    // it('should filter tasks by completed status', async () => {
    //     renderPage()
        
    //     // Wait for tasks to load
    //     await waitFor(() => {
    //         expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    //     })
        
    //     // Find the form element first
    //     const form = screen.getByRole('form')
        
    //     // Find all form items and get the second one (Status)
    //     const formItems = within(form).getAllByRole('group')
    //     const statusFormItem = formItems[1] // Second form item is the Status filter
        
    //     // Find the select element within the status form item
    //     const statusSelect = within(statusFormItem).getByRole('combobox')
    //     fireEvent.mouseDown(statusSelect)
        
    //     // Select "Completed" option
    //     const completedOption = await screen.findByText('Completed', { selector: '.ant-select-item-option-content' })
    //     fireEvent.click(completedOption)
        
    //     // Check if only completed tasks are shown
    //     await waitFor(() => {
    //         expect(screen.queryAllByText('Completed', { selector: '.ant-tag' }).length).toBeGreaterThan(0)
    //         expect(screen.queryByText('Pending', { selector: '.ant-tag' })).not.toBeInTheDocument()
    //     })
        
    //     // Reset filter and select "Pending"
    //     fireEvent.mouseDown(statusSelect)
    //     const pendingOption = await screen.findByText('Pending', { selector: '.ant-select-item-option-content' })
    //     fireEvent.click(pendingOption)
        
    //     // Check if only pending tasks are shown
    //     await waitFor(() => {
    //         expect(screen.queryAllByText('Pending', { selector: '.ant-tag' }).length).toBeGreaterThan(0)
    //         expect(screen.queryByText('Completed', { selector: '.ant-tag' })).not.toBeInTheDocument()
    //     })
    // })
    
    // it('should filter tasks by user', async () => {
    //     renderPage()
        
    //     // Wait for tasks to load
    //     await waitFor(() => {
    //         expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    //     })
        
    //     // Find the form element first
    //     const form = screen.getByRole('form')
        
    //     // Find all form items and get the third one (User)
    //     const formItems = within(form).getAllByRole('group')
    //     const userFormItem = formItems[2] // Third form item is the User filter
        
    //     // Find the select element within the user form item
    //     const userSelect = within(userFormItem).getByRole('combobox')
    //     fireEvent.mouseDown(userSelect)
        
    //     // Select "User One" option
    //     const userOneOption = await screen.findByText('User One', { selector: '.ant-select-item-option-content' })
    //     fireEvent.click(userOneOption)
        
    //     // Check if only User One's tasks are shown
    //     await waitFor(() => {
    //         // User One has Task One and Task Two
    //         expect(screen.getByText('Task One')).toBeInTheDocument()
    //         expect(screen.getByText('Task Two')).toBeInTheDocument()
    //         // Task Three belongs to User Two
    //         expect(screen.queryByText('Task Three')).not.toBeInTheDocument()
    //     })
    // })
    
    it('should reset all filters when reset button is clicked', async () => {
        renderPage()
        
        // Wait for tasks to load
        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        })
        
        // Apply a title filter
        const searchInput = screen.getByPlaceholderText('Search tasks...')
        await userEvent.clear(searchInput)
        await userEvent.type(searchInput, 'Task One')
        
        // Verify filter is applied
        expect(screen.getByText('Task One')).toBeInTheDocument()
        expect(screen.queryByText('Task Two')).not.toBeInTheDocument()
        
        // Click reset button
        const resetButton = screen.getByRole('button', { name: /reset filters/i })
        fireEvent.click(resetButton)
        
        // Verify all tasks are shown again
        await waitFor(() => {
            expect(screen.getByText('Task One')).toBeInTheDocument()
            expect(screen.getByText('Task Two')).toBeInTheDocument()
        })
    })
    
    it('should toggle task status when switch is clicked', async () => {
        // Mock the update endpoint
        const mockUpdateTodo = vi.fn()
        server.use(
            http.put('https://jsonplaceholder.typicode.com/todos/:id', ({ params }) => {
                const id = params.id
                mockUpdateTodo({ id, completed: true })
                return HttpResponse.json({ id: Number(id), completed: true })
            })
        )
        
        renderPage()
        
        // Wait for tasks to load
        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        })
        
        // Find the status switch for "Task One" (which is initially uncompleted)
        const taskOneRow = screen.getByText('Task One').closest('tr')
        if (!taskOneRow) throw new Error('Task One row not found')
        
        const taskSwitch = within(taskOneRow).getByRole('switch')
        expect(taskSwitch).not.toBeChecked()
        
        // Toggle the switch to mark as completed
        fireEvent.click(taskSwitch)
        
        // Check if the switch is now on and the tag shows "Completed"
        await waitFor(() => {
            expect(taskSwitch).toBeChecked()
            expect(within(taskOneRow).getByText('Completed')).toBeInTheDocument()
        })
        
        // Verify the API call was made with the correct data
        await waitFor(() => {
            expect(mockUpdateTodo).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: '1',
                    completed: true
                })
            )
        })
    })
    
    it('should maintain status changes when filtering', async () => {
        renderPage()
        
        // Wait for tasks to load
        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        })
        
        // Find and toggle "Task One" to completed
        const taskOneRow = screen.getByText('Task One').closest('tr')
        if (!taskOneRow) throw new Error('Task One row not found')
        
        const taskSwitch = within(taskOneRow).getByRole('switch')
        fireEvent.click(taskSwitch)
        
        // Wait for the update to complete
        await waitFor(() => {
            expect(taskSwitch).toBeChecked()
        })
        
        // Apply a filter
        const searchInput = screen.getByPlaceholderText('Search tasks...')
        await userEvent.clear(searchInput)
        await userEvent.type(searchInput, 'Task')
        
        // Clear the filter
        await userEvent.clear(searchInput)
        
        // Check if "Task One" still shows as completed
        const updatedTaskOneRow = screen.getByText('Task One').closest('tr')
        if (!updatedTaskOneRow) throw new Error('Task One row not found after filtering')
        
        const updatedTaskSwitch = within(updatedTaskOneRow).getByRole('switch')
        expect(updatedTaskSwitch).toBeChecked()
        expect(within(updatedTaskOneRow).getByText('Completed')).toBeInTheDocument()
    })
})
