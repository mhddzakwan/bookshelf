import { useEffect, useState } from "react";
import BookForm from "./components/BookForm.jsx";
import BookList from "./components/BookList.jsx";

function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  // ? UseEffect = menjalankan efek samping ketika komponen dirender, dan bisa di-trigger lagi berdasarkan perubahan data tertentu.
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://books-api-sandy.vercel.app//books");
        const books = await response.json();
        setBooks(books.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    })();
  }, []);

  const addBook = async (newBook) => {
    try {
      const res = await fetch("https://books-api-sandy.vercel.app/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      if (!res.ok) {
        throw new Error("Failed to add book");
      }

      const savedBook = await res.json();

      setBooks([...books, savedBook.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateBook = async (updatedBook) => {
    try {
      const res = await fetch(
        `https://books-api-sandy.vercel.app/books/${updatedBook.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: updatedBook.title,
            author: updatedBook.author,
            publish_date: updatedBook.publish_date,
            publisher: updatedBook.publisher,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update book");
      }

      const savedBook = await res.json();

      setBooks(
        books.map((book) =>
          book.id === savedBook.data.id ? savedBook.data : book
        )
      );
      setEditingBook(null);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBook = async (id) => {
    try {
      const res = await fetch(`https://books-api-sandy.vercel.app/books/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete book");
      }

      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const startEditing = (book) => {
    setEditingBook(book);
  };

  const cancelEditing = () => {
    setEditingBook(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Book Managers</h1>
          <p className="text-gray-600 mt-2">Manage your book collection</p>
        </header>
        <div className="grid md:grid-cols-2 gap-8">
          <BookForm
            onSubmit={editingBook ? updateBook : addBook}
            initialBook={editingBook}
            onCancel={cancelEditing}
          />
          <BookList books={books} onEdit={startEditing} onDelete={deleteBook} />
        </div>
      </div>
    </div>
  );
}

export default App;
