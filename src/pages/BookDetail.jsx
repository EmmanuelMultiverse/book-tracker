import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useBookStore } from '../store/bookStore'

export default function BookDetail() {
  const { workId } = useParams()
  const [book, setBook] = useState(null)
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const { addBook, removeBook, myBooks } = useBookStore()

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${workId}.json`)
        const data = await res.json()
        setBook(data)

        if (data.authors?.length) {
          const authorPromises = data.authors.map(async (a) => {
            const authorKey = a.author?.key || a.key
            if (!authorKey) return null
            try {
              const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`)
              return await authorRes.json()
            } catch {
              return null
            }
          })
          const authorData = await Promise.all(authorPromises)
          setAuthors(authorData.filter(Boolean))
        }
      } catch (err) {
        console.error('Failed to fetch book:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBook()
  }, [workId])

  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center py-20">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-48 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading book details...</p>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="container mx-auto p-6 text-center py-20">
        <p className="text-slate-500 text-lg mb-4">Book not found.</p>
        <Link to="/search" className="text-blue-500 hover:underline">
          Back to Search
        </Link>
      </div>
    )
  }

  const bookKey = `/works/${workId}`
  const isInMyBooks = myBooks.some(b => b.key === bookKey)
  const coverUrl = book.covers?.[0]
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : 'https://via.placeholder.com/200x300?text=No+Cover'

  const bookForStore = {
    key: bookKey,
    title: book.title,
    cover_i: book.covers?.[0],
    author_name: authors.map(a => a.name),
  }

  const description = typeof book.description === 'string'
    ? book.description
    : book.description?.value

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Link
        to="/search"
        className="text-blue-500 hover:text-blue-700 mb-6 inline-flex items-center gap-1 text-sm font-medium"
      >
        &larr; Back to Search
      </Link>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-72 bg-slate-50 p-6 flex items-start justify-center shrink-0">
            <img
              src={coverUrl}
              alt={book.title}
              className="w-48 md:w-full h-auto rounded-lg shadow"
            />
          </div>

          <div className="flex-1 p-6 md:p-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{book.title}</h1>

            {authors.length > 0 && (
              <p className="text-lg text-slate-600 mb-4">
                by {authors.map(a => a.name).join(', ')}
              </p>
            )}

            {book.first_publish_date && (
              <p className="text-sm text-slate-400 mb-4">
                First published: {book.first_publish_date}
              </p>
            )}

            {description && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Description</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>
            )}

            {book.subjects?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Subjects</h2>
                <div className="flex flex-wrap gap-2">
                  {book.subjects.slice(0, 10).map((subject) => (
                    <span
                      key={subject}
                      className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {book.subject_places?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Places</h2>
                <p className="text-sm text-slate-600">{book.subject_places.slice(0, 5).join(', ')}</p>
              </div>
            )}

            {book.subject_times?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Time Period</h2>
                <p className="text-sm text-slate-600">{book.subject_times.join(', ')}</p>
              </div>
            )}

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => isInMyBooks ? removeBook(bookKey) : addBook(bookForStore)}
                className={`py-2.5 px-6 rounded-lg font-medium transition-colors duration-150 ${
                  isInMyBooks
                    ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isInMyBooks ? 'Remove from My Books' : 'Add to My Books'}
              </button>
              {isInMyBooks && (
                <span className="text-sm text-green-600">In your collection</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {book.links?.length > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">External Links</h2>
          <ul className="space-y-2">
            {book.links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  {link.title || link.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
