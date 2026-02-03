import { create } from 'zustand'

export const useBookStore = create((set) => ({
  myBooks: [],

  addBook: (book) => set((state) => ({
    myBooks: state.myBooks.some(b => b.key === book.key)
      ? state.myBooks
      : [...state.myBooks, book]
  })),

  removeBook: (bookKey) => set((state) => ({
    myBooks: state.myBooks.filter(b => b.key !== bookKey)
  })),

  isInMyBooks: (bookKey) => {
    return useBookStore.getState().myBooks.some(b => b.key === bookKey)
  }
}))
