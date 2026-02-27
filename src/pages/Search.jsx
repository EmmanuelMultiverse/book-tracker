import { useState } from 'react'
import BookCard from '../components/BookCard'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const searchBooks = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
      )
      const data = await res.json()
      setResults(data.docs || [])
    } catch (err) {
      console.error('Search failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Search Books</h1>

      <form onSubmit={searchBooks} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, or ISBN..."
            className="flex-1 p-3 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-base"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 font-medium transition-colors"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <>
          <p className="text-sm text-slate-500 mb-4">
            {results.length} results for "{query}"
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {results.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </div>
        </>
      )}

      {results.length === 0 && !loading && !searched && (
        <div className="text-center py-16">
          <p className="text-slate-500 text-lg">
            Search for books to see results here.
          </p>
          <p className="text-slate-400 text-sm mt-2">
            Try searching by title, author name, or ISBN
          </p>
        </div>
      )}

      {results.length === 0 && !loading && searched && (
        <div className="text-center py-16">
          <p className="text-slate-500 text-lg">
            No results found for "{query}". Try a different search term.
          </p>
        </div>
      )}
    </div>
  )
}
