import { useEffect, useState } from "react";
import { PlusIcon, SaveIcon, XIcon } from "lucide-react";

function BookForm({ initialBook, onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publish_date, setPublicationDate] = useState("");
  const [publisher, setPublisher] = useState("");

  useEffect(() => {
    if (initialBook) {
      setTitle(initialBook.title);
      setAuthor(initialBook.author);
      setPublicationDate(
        new Date(initialBook.publish_date).toISOString().split("T")[0]
      );
      setPublisher(initialBook.publisher);
    } else {
      resetForm();
    }
  }, [initialBook]);

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setPublicationDate("");
    setPublisher("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !publish_date || !publisher) {
      alert("Please fill in all fields.");
      return;
    }

    const bookData = {
      ...(initialBook && { id: initialBook.id }),
      title,
      author,
      publish_date,
      publisher,
    };

    onSubmit(bookData);

    if (!initialBook) {
      resetForm();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {initialBook ? "Edit Book" : "Add New Book"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Book title"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="author"
          >
            Author
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Author name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="publicationDate"
          >
            Publication Date (YYYY-MM-DD)
          </label>
          <input
            id="publicationDate"
            type="text"
            value={publish_date}
            onChange={(e) => setPublicationDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Publication date"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="publisher"
          >
            Publisher
          </label>
          <input
            id="publisher"
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Publisher"
          />
        </div>
        <div className="flex space-x-3">
          <button
            type="submit"
            className="flex cursor-pointer items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
          >
            {initialBook ? (
              <>
                <SaveIcon className="w-4 h-4 mr-2" />
                Update Book
              </>
            ) : (
              <>
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Book
              </>
            )}
          </button>
          {initialBook && (
            <button
              type="button"
              onClick={onCancel}
              className=" flex cursor-pointer items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <XIcon className="w-4 h-4 mr-2" />
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BookForm;
