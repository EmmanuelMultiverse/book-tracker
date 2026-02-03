import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Search from './pages/Search'
import MyBooks from './pages/MyBooks'
import BookDetail from './pages/BookDetail'

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/my-books" element={<MyBooks />} />
        <Route path="/book/works/:workId" element={<BookDetail />} />
      </Routes>
    </div>
  )
}

export default App
