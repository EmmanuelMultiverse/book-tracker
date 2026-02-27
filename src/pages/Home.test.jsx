import { describe, it, expect, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import Home from './Home'
import { renderWithRouter, resetStore } from '../test/test-utils'
import { useBookStore } from '../store/bookStore'

describe('Home', () => {
  beforeEach(() => {
    resetStore()
  })

  it('renders welcome heading', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText('Welcome to Book Tracker')).toBeInTheDocument()
  })

  it('renders search and my books cards', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText('Search For Books!')).toBeInTheDocument()
    expect(screen.getByText('My Books!')).toBeInTheDocument()
  })

  it('displays correct book count', () => {
    useBookStore.getState().addBook({ key: '/works/OL1W', title: 'Test' })
    renderWithRouter(<Home />)
    expect(screen.getByText(/1 book/)).toBeInTheDocument()
  })

  it('displays 0 books when collection is empty', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/0 books/)).toBeInTheDocument()
  })

  it('links to search page', () => {
    renderWithRouter(<Home />)
    const links = screen.getAllByRole('link')
    const hrefs = links.map(l => l.getAttribute('href'))
    expect(hrefs).toContain('/search')
  })

  it('links to my books page', () => {
    renderWithRouter(<Home />)
    const links = screen.getAllByRole('link')
    const hrefs = links.map(l => l.getAttribute('href'))
    expect(hrefs).toContain('/my-books')
  })
})
