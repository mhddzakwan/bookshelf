import { PencilIcon, TrashIcon, BookOpenIcon } from "lucide-react";

function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <BookOpenIcon className="w-12 h-12 mx-auto text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No books yet</h3>
        <p className="mt-1 text-gray-500">
          Add your first book using the form.
        </p>
      </div>
    );
  }
  return (
    <div className="w-full overflow-x-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Books</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-4 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Publication Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Publisher
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {book.title}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {book.author}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(book.publish_date).toLocaleDateString("id-ID")}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {book.publisher}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(book)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <PencilIcon className="w-5 h-5 cursor-pointer" />
                    </button>
                    <button
                      onClick={() => onDelete(book.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <TrashIcon className="w-5 h-5 cursor-pointer" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookList;
