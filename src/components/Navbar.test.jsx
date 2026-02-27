import { describe, it, expect, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import Navbar from './Navbar'
import { renderWithRouter, resetStore } from '../test/test-utils'
import { useBookStore } from '../store/bookStore'

describe('Navbar', () => {
  beforeEach(() => {
    resetStore()
  })

  it('renders the app name', () => {
    renderWithRouter(<Navbar />)
    expect(screen.getByText('Book Tracker')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    renderWithRouter(<Navbar />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
  })

  it('shows book count as 0 when no books saved', () => {
    renderWithRouter(<Navbar />)
    expect(screen.getByText(/My Books/)).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('updates book count when books are added', () => {
    useBookStore.getState().addBook({ key: '/works/OL1W', title: 'Test' })
    useBookStore.getState().addBook({ key: '/works/OL2W', title: 'Test 2' })
    renderWithRouter(<Navbar />)
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('has correct link destinations', () => {
    renderWithRouter(<Navbar />)
    const links = screen.getAllByRole('link')
    const hrefs = links.map(l => l.getAttribute('href'))
    expect(hrefs).toContain('/')
    expect(hrefs).toContain('/search')
    expect(hrefs).toContain('/my-books')
  })
})
