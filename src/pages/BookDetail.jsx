import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useBookStore } from '../store/bookStore'

export default function BookDetail() {
  const { workId } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addBook, removeBook, myBooks } = useBookStore()

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${workId}.json`)
        const data = await res.json()
        setBook(data)
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
      <div className="container mx-auto p-6 text-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-slate-500">Book not found.</p>
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
  }

  return (
    <div className="container mx-auto p-6">
      <Link to="/search" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Search
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={coverUrl}
          alt={book.title}
          className="w-48 h-auto rounded shadow"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">{book.title}</h1>

          {book.description && (
            <p className="text-slate-600 mb-4">
              {typeof book.description === 'string'
                ? book.description
                : book.description.value}
            </p>
          )}

          <button
            onClick={() => isInMyBooks ? removeBook(bookKey) : addBook(bookForStore)}
            className={`py-2 px-6 rounded text-white ${
              isInMyBooks ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isInMyBooks ? 'Remove from My Books' : 'Add to My Books'}
          </button>
        </div>
      </div>
    </div>
  )
}
