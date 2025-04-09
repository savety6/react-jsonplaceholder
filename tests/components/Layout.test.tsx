import { it, expect, describe } from 'vitest'
import { render } from '@testing-library/react'
import Layout from 'antd/es/layout'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
describe('Layout', () => {
    it('should render', () => {
        render(<BrowserRouter><Layout /></BrowserRouter>)
    })
})