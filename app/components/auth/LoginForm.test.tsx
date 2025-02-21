import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm'

// Mock the next/navigation router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('LoginForm', () => {
  const mockRole = 'STUDENT'

  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = jest.fn()
  })

  it('renders login form with correct title', () => {
    render(<LoginForm role={mockRole} />)
    expect(screen.getByText('Student Login')).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    render(<LoginForm role={mockRole} />)
    
    const submitButton = screen.getByRole('button', { name: /login/i })
    fireEvent.click(submitButton)

    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)

    expect(usernameInput).toBeRequired()
    expect(passwordInput).toBeRequired()
  })

  it('handles successful login', async () => {
    const mockResponse = { success: true }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    })

    render(<LoginForm role={mockRole} />)

    await userEvent.type(screen.getByLabelText(/username/i), 'testuser')
    await userEvent.type(screen.getByLabelText(/password/i), 'password123')

    const submitButton = screen.getByRole('button', { name: /login/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Success! Redirecting...')).toBeInTheDocument()
    })
  })

  it('handles login failure', async () => {
    const errorMessage = 'Invalid credentials'
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: errorMessage }),
    })

    render(<LoginForm role={mockRole} />)

    await userEvent.type(screen.getByLabelText(/username/i), 'testuser')
    await userEvent.type(screen.getByLabelText(/password/i), 'wrongpassword')

    const submitButton = screen.getByRole('button', { name: /login/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })

  it('disables form submission while loading', async () => {
    render(<LoginForm role={mockRole} />)

    const submitButton = screen.getByRole('button', { name: /login/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(submitButton).toBeDisabled()
      expect(screen.getByText('Logging in...')).toBeInTheDocument()
    })
  })
}) 