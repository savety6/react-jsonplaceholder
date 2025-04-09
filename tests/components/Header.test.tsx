import '../setup'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Header from '../../src/components/Header'

describe('Header', () => {
    const renderHeader = () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        )
    }

    it('should render logo plus menu items', () => {
        renderHeader()
        const logo = screen.getByRole('heading', { name: 'LOGO' })
        expect(logo).toBeInTheDocument()
    })

    it('should render navigation menu items', () => {
        renderHeader()
        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Tasks')).toBeInTheDocument()
    })

    it('should have correct navigation links', () => {
        renderHeader()
        const homeLink = screen.getByText('Home').closest('a')
        const tasksLink = screen.getByText('Tasks').closest('a')
        
        expect(homeLink).toHaveAttribute('href', '/')
        expect(tasksLink).toHaveAttribute('href', '/tasks')
    })
})

