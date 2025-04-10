import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import store from '../../src/context/store'
import User from '../../src/pages/User'

describe('User', () => {
    it('should render the user page', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users/1']}>
                    <Routes>
                        <Route path="/users/:id" element={<User/>} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )
        screen.debug()
        expect(screen.getByRole('status')).toBeInTheDocument();
        const userProfile = await screen.findByText(/user profile/i)
        const posts = await screen.findByText(/posts/i)
        expect(userProfile).toBeInTheDocument()
        expect(posts).toBeInTheDocument()
    })
})
