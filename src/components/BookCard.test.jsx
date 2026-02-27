import { describe, it, expect, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookCard from './BookCard'
import { renderWithRouter, resetStore, mockBook, mockBookNocover } from '../test/test-utils'
import { useBookStore } from '../store/bookStore'

describe('BookCard', () => {
  beforeEach(() => {
    resetStore()
  })

  it('renders book title and author', () => {
    renderWithRouter(<BookCard book={mockBook} />)
    expect(screen.getByText('Test Book Title')).toBeInTheDocument()
    expect(screen.getByText('Author One, Author Two')).toBeInTheDocument()
  })

  it('renders cover image when cover_i is present', () => {
    renderWithRouter(<BookCard book={mockBook} />)
    const img = screen.getByAltText('Test Book Title')
    expect(img.src).toContain('12345')
  })

  it('renders placeholder when no cover', () => {
    renderWithRouter(<BookCard book={mockBookNocover} />)
    const img = screen.getByAltText('Book Without Cover')
    expect(img.src).toContain('placeholder')
  })

  it('shows "Add to My Books" when book is not in collection', () => {
    renderWithRouter(<BookCard book={mockBook} />)
    expect(screen.getByText('Add to My Books')).toBeInTheDocument()
  })

  it('adds book to store when clicking add button', async () => {
    const user = userEvent.setup()
    renderWithRouter(<BookCard book={mockBook} />)
    await user.click(screen.getByText('Add to My Books'))
    expect(useBookStore.getState().myBooks).toHaveLength(1)
  })

  it('shows "Remove" when book is already in collection', () => {
    useBookStore.getState().addBook(mockBook)
    renderWithRouter(<BookCard book={mockBook} />)
    expect(screen.getByText('Remove')).toBeInTheDocument()
  })

  it('removes book from store when clicking remove button', async () => {
    const user = userEvent.setup()
    useBookStore.getState().addBook(mockBook)
    renderWithRouter(<BookCard book={mockBook} />)
    await user.click(screen.getByText('Remove'))
    expect(useBookStore.getState().myBooks).toHaveLength(0)
  })

  it('displays first publish year when available', () => {
    renderWithRouter(<BookCard book={mockBook} />)
    expect(screen.getByText('2020')).toBeInTheDocument()
  })

  it('links to the correct book detail page', () => {
    renderWithRouter(<BookCard book={mockBook} />)
    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe('/book/works/OL123W')
  })
})
