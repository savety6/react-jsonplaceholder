import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '../../src/components/Header'

describe('Header', () => {
    it('should render the header', () => {
        render(<MemoryRouter><Header /></MemoryRouter>)
        const homeLink = screen.getByText(/home/i)
        const tasksLink = screen.getByText(/task/i)
        expect(homeLink).toBeInTheDocument()
        expect(tasksLink).toBeInTheDocument()
    })
})
