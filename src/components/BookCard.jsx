import { Link } from 'react-router-dom'
import { useBookStore } from '../store/bookStore'

export default function BookCard({ book }) {
  const { addBook, removeBook, myBooks } = useBookStore()
  const isInMyBooks = myBooks.some(b => b.key === book.key)

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://via.placeholder.com/128x192?text=No+Cover'

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <Link to={`/book${book.key}`}>
        <img
          src={coverUrl}
          alt={book.title}
          className="w-full h-48 object-contain mb-2"
        />
        <h3 className="font-semibold text-slate-800 truncate">{book.title}</h3>
        <p className="text-sm text-slate-600 truncate">
          {book.author_name?.join(', ') || 'Unknown Author'}
        </p>
      </Link>
      <button
        onClick={() => isInMyBooks ? removeBook(book.key) : addBook(book)}
        className={`mt-auto py-2 px-4 rounded text-white ${
          isInMyBooks ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isInMyBooks ? 'Remove' : 'Add to My Books'}
      </button>
    </div>
  )
}
