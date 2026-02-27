import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search from './Search'
import { renderWithRouter, resetStore } from '../test/test-utils'

const mockSearchResponse = {
  docs: [
    {
      key: '/works/OL1W',
      title: 'Search Result One',
      author_name: ['Author A'],
      cover_i: 111,
      first_publish_year: 2020,
    },
    {
      key: '/works/OL2W',
      title: 'Search Result Two',
      author_name: ['Author B'],
      cover_i: 222,
      first_publish_year: 2019,
    },
  ],
}

describe('Search', () => {
  beforeEach(() => {
    resetStore()
    vi.restoreAllMocks()
  })

  it('renders search heading and form', () => {
    renderWithRouter(<Search />)
    expect(screen.getByText('Search Books')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search by title, author, or ISBN...')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
  })

  it('shows initial empty state message', () => {
    renderWithRouter(<Search />)
    expect(screen.getByText(/Search for books to see results here/)).toBeInTheDocument()
  })

  it('does not search with empty query', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const user = userEvent.setup()
    renderWithRouter(<Search />)
    await user.click(screen.getByRole('button', { name: 'Search' }))
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('performs search and displays results', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(mockSearchResponse),
    })
    const user = userEvent.setup()
    renderWithRouter(<Search />)

    await user.type(screen.getByPlaceholderText('Search by title, author, or ISBN...'), 'test query')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    await waitFor(() => {
      expect(screen.getByText('Search Result One')).toBeInTheDocument()
      expect(screen.getByText('Search Result Two')).toBeInTheDocument()
    })
  })

  it('shows result count after search', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(mockSearchResponse),
    })
    const user = userEvent.setup()
    renderWithRouter(<Search />)

    await user.type(screen.getByPlaceholderText('Search by title, author, or ISBN...'), 'test')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    await waitFor(() => {
      expect(screen.getByText(/2 results/)).toBeInTheDocument()
    })
  })

  it('shows loading state during search', async () => {
    let resolvePromise
    vi.spyOn(globalThis, 'fetch').mockReturnValueOnce(
      new Promise(resolve => { resolvePromise = resolve })
    )
    const user = userEvent.setup()
    renderWithRouter(<Search />)

    await user.type(screen.getByPlaceholderText('Search by title, author, or ISBN...'), 'test')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(screen.getByText('Searching...')).toBeInTheDocument()

    resolvePromise({ json: () => Promise.resolve({ docs: [] }) })
    await waitFor(() => {
      expect(screen.queryByText('Searching...')).not.toBeInTheDocument()
    })
  })

  it('handles fetch error gracefully', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'))
    const user = userEvent.setup()
    renderWithRouter(<Search />)

    await user.type(screen.getByPlaceholderText('Search by title, author, or ISBN...'), 'test')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    await waitFor(() => {
      expect(screen.queryByText('Searching...')).not.toBeInTheDocument()
    })
  })
})
