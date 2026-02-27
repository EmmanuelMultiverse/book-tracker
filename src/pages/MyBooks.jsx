import { useState } from 'react'
import { useBookStore } from '../store/bookStore'
import BookCard from '../components/BookCard'
import { Link } from 'react-router-dom'

export default function MyBooks() {
  const myBooks = useBookStore((state) => state.myBooks)
  const removeBook = useBookStore((state) => state.removeBook)
  const [view, setView] = useState('grid')

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My Books</h1>
          {myBooks.length > 0 && (
            <p className="text-slate-500 mt-1">{myBooks.length} {myBooks.length === 1 ? 'book' : 'books'} in your collection</p>
          )}
        </div>
        {myBooks.length > 0 && (
          <div className="flex gap-1 bg-slate-200 rounded-lg p-1">
            <button
              onClick={() => setView('grid')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                view === 'grid' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                view === 'list' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              List
            </button>
          </div>
        )}
      </div>

      {myBooks.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">Your collection is empty</h2>
          <p className="text-slate-500 mb-6">Start building your reading list by searching for books.</p>
          <Link
            to="/search"
            className="inline-block bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 font-medium transition-colors"
          >
            Search for Books
          </Link>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {myBooks.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {myBooks.map((book) => {
            const coverUrl = book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
              : 'https://via.placeholder.com/40x60?text=No+Cover'

            return (
              <div key={book.key} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                <Link to={`/book${book.key}`} className="shrink-0">
                  <img src={coverUrl} alt={book.title} className="w-12 h-16 object-cover rounded" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/book${book.key}`} className="hover:text-blue-500 transition-colors">
                    <h3 className="font-semibold text-slate-800 truncate">{book.title}</h3>
                  </Link>
                  <p className="text-sm text-slate-500 truncate">
                    {book.author_name?.join(', ') || 'Unknown Author'}
                  </p>
                </div>
                <button
                  onClick={() => removeBook(book.key)}
                  className="shrink-0 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Remove
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
