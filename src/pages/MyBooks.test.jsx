import { describe, it, expect, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyBooks from './MyBooks'
import { renderWithRouter, resetStore, mockBook } from '../test/test-utils'
import { useBookStore } from '../store/bookStore'

describe('MyBooks', () => {
  beforeEach(() => {
    resetStore()
  })

  it('shows empty state when no books saved', () => {
    renderWithRouter(<MyBooks />)
    expect(screen.getByText(/Your collection is empty/)).toBeInTheDocument()
    expect(screen.getByText('Search for Books')).toBeInTheDocument()
  })

  it('links to search page in empty state', () => {
    renderWithRouter(<MyBooks />)
    const link = screen.getByRole('link', { name: 'Search for Books' })
    expect(link.getAttribute('href')).toBe('/search')
  })

  it('displays saved books', () => {
    useBookStore.getState().addBook(mockBook)
    renderWithRouter(<MyBooks />)
    expect(screen.getByText('Test Book Title')).toBeInTheDocument()
  })

  it('shows correct book count in heading', () => {
    useBookStore.getState().addBook(mockBook)
    useBookStore.getState().addBook({
      key: '/works/OL999W',
      title: 'Another Book',
      author_name: ['Author X'],
    })
    renderWithRouter(<MyBooks />)
    expect(screen.getByText(/2 books/)).toBeInTheDocument()
  })

  it('allows removing a book from the collection', async () => {
    const user = userEvent.setup()
    useBookStore.getState().addBook(mockBook)
    renderWithRouter(<MyBooks />)

    await user.click(screen.getByText('Remove'))
    expect(useBookStore.getState().myBooks).toHaveLength(0)
  })
})
