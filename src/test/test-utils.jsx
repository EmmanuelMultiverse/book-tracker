import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useBookStore } from '../store/bookStore'

export function renderWithRouter(ui, { route = '/', ...options } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>,
    options
  )
}

export function resetStore() {
  useBookStore.setState({ myBooks: [] })
}

export const mockBook = {
  key: '/works/OL123W',
  title: 'Test Book Title',
  author_name: ['Author One', 'Author Two'],
  cover_i: 12345,
  first_publish_year: 2020,
  edition_count: 5,
  number_of_pages_median: 320,
  subject: ['Fiction', 'Adventure', 'Fantasy'],
  ratings_average: 4.2,
  ratings_count: 150,
  language: ['eng', 'spa'],
}

export const mockBookDetail = {
  title: 'Test Book Title',
  covers: [12345],
  description: 'A wonderful test book about testing.',
  subjects: ['Fiction', 'Adventure', 'Fantasy'],
  subject_places: ['New York', 'London'],
  subject_times: ['21st century'],
  created: { value: '2020-01-01' },
  last_modified: { value: '2023-06-15' },
}

export const mockBookNocover = {
  key: '/works/OL456W',
  title: 'Book Without Cover',
  author_name: ['Solo Author'],
  first_publish_year: 2015,
}
