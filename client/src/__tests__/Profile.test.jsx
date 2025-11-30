import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import Profile from '../../components/Profile'

// Mock the auth module so isAuthenticated returns false (not signed in)
vi.mock('../../src/auth.js', () => ({
    default: {
        isAuthenticated: () => false
    }
}))

describe('Profile component', () => {
    test('shows not signed in message when no user', () => {
        render(<Profile />)
        expect(screen.getByText(/You are not signed in\./i)).toBeInTheDocument()
    })
})
