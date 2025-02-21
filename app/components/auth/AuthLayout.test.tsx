import { render, screen } from '@testing-library/react'
import AuthLayout from './AuthLayout'

describe('AuthLayout', () => {
  it('renders children and title correctly', () => {
    const title = 'Test Title'
    const childText = 'Test Child Content'

    render(
      <AuthLayout title={title}>
        <div>{childText}</div>
      </AuthLayout>
    )

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(childText)).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    render(
      <AuthLayout title="Test">
        <div>Content</div>
      </AuthLayout>
    )

    const container = screen.getByRole('main')
    expect(container).toHaveClass(
      'min-h-screen',
      'bg-gray-50',
      'flex',
      'flex-col',
      'justify-center'
    )
  })
}) 