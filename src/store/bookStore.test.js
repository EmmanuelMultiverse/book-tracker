import { describe, it, expect, beforeEach } from 'vitest'
import { useBookStore } from './bookStore'

const mockBook1 = { key: '/works/OL1W', title: 'Book One', cover_i: 111 }
const mockBook2 = { key: '/works/OL2W', title: 'Book Two', cover_i: 222 }

describe('bookStore', () => {
  beforeEach(() => {
    useBookStore.setState({ myBooks: [] })
  })

  it('starts with an empty myBooks array', () => {
    expect(useBookStore.getState().myBooks).toEqual([])
  })

  it('adds a book to myBooks', () => {
    useBookStore.getState().addBook(mockBook1)
    expect(useBookStore.getState().myBooks).toHaveLength(1)
    expect(useBookStore.getState().myBooks[0]).toEqual(mockBook1)
  })

  it('does not add duplicate books', () => {
    useBookStore.getState().addBook(mockBook1)
    useBookStore.getState().addBook(mockBook1)
    expect(useBookStore.getState().myBooks).toHaveLength(1)
  })

  it('adds multiple different books', () => {
    useBookStore.getState().addBook(mockBook1)
    useBookStore.getState().addBook(mockBook2)
    expect(useBookStore.getState().myBooks).toHaveLength(2)
  })

  it('removes a book by key', () => {
    useBookStore.getState().addBook(mockBook1)
    useBookStore.getState().addBook(mockBook2)
    useBookStore.getState().removeBook(mockBook1.key)
    expect(useBookStore.getState().myBooks).toHaveLength(1)
    expect(useBookStore.getState().myBooks[0].key).toBe(mockBook2.key)
  })

  it('handles removing a non-existent book gracefully', () => {
    useBookStore.getState().addBook(mockBook1)
    useBookStore.getState().removeBook('/works/nonexistent')
    expect(useBookStore.getState().myBooks).toHaveLength(1)
  })

  it('isInMyBooks returns correct status', () => {
    useBookStore.getState().addBook(mockBook1)
    expect(useBookStore.getState().isInMyBooks(mockBook1.key)).toBe(true)
    expect(useBookStore.getState().isInMyBooks('/works/unknown')).toBe(false)
  })
})
