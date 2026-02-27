import { Link } from 'react-router-dom'
import { useBookStore } from '../store/bookStore'

export default function BookCard({ book }) {
  const { addBook, removeBook, myBooks } = useBookStore()
  const isInMyBooks = myBooks.some(b => b.key === book.key)

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://via.placeholder.com/128x192?text=No+Cover'

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col overflow-hidden">
      <Link to={`/book${book.key}`} className="group">
        <div className="relative bg-slate-50 p-4 flex items-center justify-center h-56">
          <img
            src={coverUrl}
            alt={book.title}
            className="max-h-full object-contain rounded group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="p-4 pb-2">
          <h3 className="font-semibold text-slate-800 truncate text-base" title={book.title}>
            {book.title}
          </h3>
          <p className="text-sm text-slate-500 truncate mt-1">
            {book.author_name?.join(', ') || 'Unknown Author'}
          </p>
          {book.first_publish_year && (
            <p className="text-xs text-slate-400 mt-1">{book.first_publish_year}</p>
          )}
        </div>
      </Link>
      <div className="p-4 pt-0 mt-auto">
        <button
          onClick={() => isInMyBooks ? removeBook(book.key) : addBook(book)}
          className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-150 ${
            isInMyBooks
              ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isInMyBooks ? 'Remove' : 'Add to My Books'}
        </button>
      </div>
    </div>
  )
}
