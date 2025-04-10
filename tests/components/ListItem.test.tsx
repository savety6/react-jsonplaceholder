import { render, screen, fireEvent, waitFor  } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ListItem from '../../src/components/ListItem'
import { User as UserType } from '../../src/types/UserType'
import { Provider } from 'react-redux'
import store from '../../src/context/store'
import User from '../../src/pages/User'

const user: UserType = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
            lat: "-37.3159",
            lng: "81.1496"
        }
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets"
    }
}

const renderItem = () => {
    return render(<Provider store={store}><MemoryRouter><ListItem user={user} /></MemoryRouter></Provider>)
}

describe('ListItem', () => {
    it('should render the list item', () => {
        renderItem()
        const antCollapseHeader = screen.getByRole('button', { name: /leanne graham/i })
        const panel = screen.queryByText(/user/i)
        expect(antCollapseHeader).toBeInTheDocument()
        expect(panel).not.toBeInTheDocument()
    })
    it('should expand the list item when the header is clicked', async () => {
        renderItem()
        const antCollapseHeader = screen.getByRole('button', { name: /leanne graham/i })
        fireEvent.click(antCollapseHeader);
        await waitFor(() => {
            expect(screen.getByText(/Bret/i)).toBeInTheDocument();
        });
    })
    it('should be editable', async () => {
        renderItem()
        
        // First expand the panel
        const antCollapseHeader = screen.getByRole('button', { name: /leanne graham/i })
        fireEvent.click(antCollapseHeader);
        
        // Wait for the panel to expand and find the edit button
        const editButton = await screen.findByRole('button', { name: /edit/i })
        fireEvent.click(editButton)
        
        // Wait for the edit form to appear and verify its presence
        await waitFor(() => {
            // Look for form fields by their name attributes
            expect(screen.getByDisplayValue(user.name)).toBeInTheDocument()
            expect(screen.getByDisplayValue(user.username)).toBeInTheDocument()
            expect(screen.getByDisplayValue(user.email)).toBeInTheDocument()
            expect(screen.getByDisplayValue(user.address.city)).toBeInTheDocument()
        })
    })
    it('should be deletable', async () => {
        renderItem()
        const antCollapseHeader = screen.getByRole('button', { name: /leanne graham/i })
        fireEvent.click(antCollapseHeader);
        const deleteButton = await screen.findByRole('button', { name: /delete/i })
        fireEvent.click(deleteButton)
        await waitFor(() => {
            expect(screen.getByText(/confirm/i)).toBeInTheDocument()
        })
    })
    it('should validate the form', async () => {
        renderItem()
        const antCollapseHeader = screen.getByRole('button', { name: /leanne graham/i })
        fireEvent.click(antCollapseHeader);
        const editButton = await screen.findByRole('button', { name: /edit/i })
        fireEvent.click(editButton)

        // Clear all required fields
        const nameInput = screen.getByDisplayValue(/leanne graham/i)
        const usernameInput = screen.getByDisplayValue(/bret/i)
        const emailInput = screen.getByDisplayValue(/sincere@april.biz/i)
        const streetInput = screen.getByDisplayValue(/kulas light/i)
        const suiteInput = screen.getByDisplayValue(/apt. 556/i)
        const cityInput = screen.getByDisplayValue(/gwenborough/i)

        fireEvent.change(nameInput, { target: { value: '' } })
        fireEvent.change(usernameInput, { target: { value: '' } })
        fireEvent.change(emailInput, { target: { value: '' } })
        fireEvent.change(streetInput, { target: { value: '' } })
        fireEvent.change(suiteInput, { target: { value: '' } })
        fireEvent.change(cityInput, { target: { value: '' } })

        const saveButton = screen.getByRole('button', { name: /save/i })
        fireEvent.click(saveButton)

        await waitFor(() => {
            expect(screen.getByText(/please input name/i)).toBeInTheDocument()
            expect(screen.getByText(/please input username/i)).toBeInTheDocument()
            expect(screen.getByText(/please input email/i)).toBeInTheDocument()
            expect(screen.getByText(/please input street/i)).toBeInTheDocument()
            expect(screen.getByText(/please input suite/i)).toBeInTheDocument()
            expect(screen.getByText(/please input city/i)).toBeInTheDocument()
        })
    })
    it('should be able to cancel the form', async () => {
        renderItem()
        const antCollapseHeader = screen.getByRole('button', { name: /leanne graham/i })
        fireEvent.click(antCollapseHeader);
        const editButton = await screen.findByRole('button', { name: /edit/i })
        fireEvent.click(editButton)

        const cancelButton = await screen.findByRole('button', { name: /cancel/i })
        fireEvent.click(cancelButton)
        await waitFor(() => {
            expect(screen.getByText(/edit/i)).toBeInTheDocument()
        })
    })
    it('should revert the form (should only be active when changes are made)', async () => {
        renderItem()
        const antCollapseHeader = screen.getByRole('button', { name: /leanne graham/i })
        fireEvent.click(antCollapseHeader);
        const editButton = await screen.findByRole('button', { name: /edit/i })
        fireEvent.click(editButton)

        const revertButton = await screen.findByRole('button', { name: /revert/i })
        expect(revertButton).toBeDisabled()
        const nameInput = screen.getByDisplayValue(/leanne graham/i)
        fireEvent.change(nameInput, { target: { value: 'John Doe' } })
        expect(revertButton).not.toBeDisabled()
        fireEvent.click(revertButton)
        await waitFor(() => {
            expect(screen.getByDisplayValue(/leanne graham/i)).toBeInTheDocument()
        })
    })
    it('should be able to see posts', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<ListItem user={user} />} />
                        <Route path="/users/:id" element={<User/>} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )
        const seePostsText = screen.getByText(/see posts/i)
        const seePostsButton = seePostsText.closest('button')
        expect(seePostsButton).toBeInTheDocument()
        
        fireEvent.click(seePostsButton!)
        await waitFor(() => {
            expect(screen.getByText(/posts/i)).toBeInTheDocument()
            expect(screen.getByText(/user profile/i)).toBeInTheDocument()
        })
    })
})
