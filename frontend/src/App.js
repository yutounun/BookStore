import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const emptyInput = {
    title: "",
    author: "",
    overview: "",
  };

  const [books, setBooks] = useState([]);
  const [inputValues, setInputValues] = useState(emptyInput);
  const [selectedId, setSelectedId] = useState();
  const [showsEdit, setShowsEdit] = useState(false);

  useEffect(() => {
    fetchBooksData();
  }, []);

  /**
   * Fetches data of books from the server and sets the book names to the state.
   * @returns {void}
   */
  const fetchBooksData = () => {
    axios.get("http://localhost:8080/books").then((response) => {
      setBooks(response.data);
    });
  };

  /**
   * Posts book data to the server.
   *
   * @return {Promise} A Promise that resolves with the server's response data.
   */
  const postBookData = () => {
    return axios.post("http://localhost:8080/books", inputValues);
  };

  const deleteBookData = (id) => {
    return axios.delete(`http://localhost:8080/books/${id}`);
  };

  const putBookData = (id) => {
    return axios.put(`http://localhost:8080/books/${id}`, inputValues);
  };

  /**
   * Adds the current input value to the list of book names, and resets the input field.
   * @function handleSubmit
   */
  const handleSubmit = async () => {
    postBookData()
      .then(fetchBooksData)
      .finally(() => {
        setInputValues(emptyInput);
      });
  };

  /**
   * Remove a book from the collection and update the list of books.
   *
   * @param {number} id - The index of the book to remove.
   * @returns {void}
   */

  const handleRemove = (id) => {
    deleteBookData(id).then(fetchBooksData);
  };
  const handleEdit = (book) => {
    setShowsEdit(true);
    setSelectedId(book.id);
    setInputValues(book);
  };
  const completeEdit = () => {
    putBookData(selectedId).then(() => {
      setShowsEdit(false);
      setInputValues(emptyInput);
      fetchBooksData();
    });
  };

  return (
    <div>
      <h1>Welcome to Book Store!!</h1>
      <div>
        <span>タイトル</span>
        <input
          type="text"
          value={inputValues.title}
          onInput={(e) =>
            setInputValues({ ...inputValues, title: e.target.value })
          }
        />
        <span>著者</span>
        <input
          type="text"
          value={inputValues.author}
          onInput={(e) =>
            setInputValues({ ...inputValues, author: e.target.value })
          }
        />
        <span>概要</span>
        <input
          type="text"
          value={inputValues.overview}
          onInput={(e) =>
            setInputValues({ ...inputValues, overview: e.target.value })
          }
        />
        {showsEdit}
        {showsEdit ? (
          <button onClick={completeEdit}>complete editing</button>
        ) : (
          <button onClick={handleSubmit}>Add Book</button>
        )}
      </div>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <button onClick={() => handleEdit(book)}>edit</button>
            <span>{book.title}</span>
            <span>{book.author}</span>
            <span>{book.overview}</span>
            <span onClick={() => handleRemove(book.id)}> X</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
