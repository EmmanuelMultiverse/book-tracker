import { Link } from 'react-router-dom'
import { useBookStore } from '../store/bookStore'

export default function Home() {
  const myBooks = useBookStore((state) => state.myBooks)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-4">Welcome to Book Tracker</h1>
      <p className="text-slate-600 mb-6">
        Search for books and add them to your reading list.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/search"
          className="bg-blue-500 text-white p-6 rounded-lg hover:bg-blue-600 text-center"
        >
          <h2 className="text-xl font-semibold">Search For Books!</h2>
          <p className="mt-2">Find books using Open Library API</p>
        </Link>

        <Link
          to="/my-books"
          className="bg-green-500 text-white p-6 rounded-lg hover:bg-green-600 text-center"
        >
          <h2 className="text-xl font-semibold">My Books!</h2>
          <p className="mt-2">View your collection ({myBooks.length} books)</p>
        </Link>
      </div>
    </div>
  )
}
