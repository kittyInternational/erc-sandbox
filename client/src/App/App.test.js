import { render, screen } from '@testing-library/react'
import App from './App'

test('renders erc sandbox link', () => {
    render(<App />)
    const linkElement = screen.getByText(/erc sandbox/i)
    expect(linkElement).toBeInTheDocument()
})
