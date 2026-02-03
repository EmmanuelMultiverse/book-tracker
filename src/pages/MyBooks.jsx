import { useBookStore } from '../store/bookStore'
import BookCard from '../components/BookCard'
import { Link } from 'react-router-dom'

export default function MyBooks() {
  const myBooks = useBookStore((state) => state.myBooks)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-4">My Books</h1>

      {myBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500 mb-4">No books in your collection yet.</p>
          <Link
            to="/search"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Search for Books
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {myBooks.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}
