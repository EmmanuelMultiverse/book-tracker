import { Link } from 'react-router-dom'
import { useBookStore } from '../store/bookStore'

export default function Navbar() {
  const myBooks = useBookStore((state) => state.myBooks)

  return (
    <nav className="bg-slate-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Book Tracker</Link>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-slate-300">Home</Link>
          <Link to="/search" className="hover:text-slate-300">Search</Link>
          <Link to="/my-books" className="hover:text-slate-300">
            My Books ({myBooks.length})
          </Link>
        </div>
      </div>
    </nav>
  )
}
