import { Link } from 'react-router-dom'
import { useBookStore } from '../store/bookStore'

export default function Navbar() {
  const myBooks = useBookStore((state) => state.myBooks)

  return (
    <nav className="bg-slate-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tight">Book Tracker</Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-slate-300 transition-colors text-sm font-medium">Home</Link>
          <Link to="/search" className="hover:text-slate-300 transition-colors text-sm font-medium">Search</Link>
          <Link to="/my-books" className="hover:text-slate-300 transition-colors text-sm font-medium flex items-center gap-1.5">
            My Books
            <span className="bg-blue-500 text-xs px-2 py-0.5 rounded-full font-semibold">
              {myBooks.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
