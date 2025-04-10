import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import store from '../../src/context/store'
import Home from '../../src/pages/Home'

describe('Header', () => {
    it('should render the home page with users', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>
        )
        // Verify loading spinner is displayed initially
        expect(screen.getByRole('status')).toBeInTheDocument();
        // Wait for the users to be displayed
        const userItems = await screen.findAllByRole('listitem');
        expect(userItems).toHaveLength(10);
    })
})
