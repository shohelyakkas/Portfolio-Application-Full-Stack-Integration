import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Home from '../../components/Home'

describe('Home component', () => {
    test('renders intro headline text', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )
        const headline = screen.getByText(/Hello, I am Shohely Akkas/i)
        expect(headline).toBeInTheDocument()
    })
})
