import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import store from '../../src/context/store'
import User from '../../src/pages/User'

const renderPage = () => {
    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/users/1']}>
                <Routes>
                    <Route path="/users/:id" element={<User />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    )
}

describe('User Page', () => {
    it('should render the user page', async () => {
        renderPage()
        expect(screen.getByRole('status')).toBeInTheDocument();
        const userProfile = await screen.findByText(/user profile/i)
        const posts = await screen.findByText(/posts/i)
        expect(userProfile).toBeInTheDocument()
        expect(posts).toBeInTheDocument()
    })
    it('should allow to edit the user profile', async () => {
        renderPage()
        const editProfileButton = await screen.findByText(/edit profile/i)
        expect(editProfileButton).toBeInTheDocument()
        fireEvent.click(editProfileButton!)
        const nameInput = await screen.findByDisplayValue(/leanne graham/i)
        expect(nameInput).toBeInTheDocument()
        fireEvent.change(nameInput, { target: { value: 'John Doe' } })
        const saveButton = await screen.findByText(/save/i)
        expect(saveButton).toBeInTheDocument()
        fireEvent.click(saveButton!)
        await waitFor(() => {
            expect(screen.getByDisplayValue(/john doe/i)).toBeInTheDocument()
        })
    })
    it('should fetch and display a list of posts for the given user id', async () => {
        renderPage()
        const heading = screen.getByRole('heading', { level: 3, name: /User Posts/i });

        const container = heading.parentElement;
        expect(container).not.toBeNull();

        const utils = within(container!); 
        const postItems = await utils.findByText(/post one/i)
        expect(postItems).toBeInTheDocument()
    })
    
})
