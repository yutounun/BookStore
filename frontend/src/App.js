import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [bookNames, setBookNames] = useState([
    "react for beginner",
    "Laravel for beginner",
  ]);
  const [inputValue, setInputValue] = useState();
  const [selectedIndex, setSelectedIndex] = useState();
  const [showsEdit, setShowsEdit] = useState(false);

  useEffect(() => {
    fetchBooksData();
  });

  const fetchBooksData = () => {
    axios.get("http://localhost:8080/books").then((response) => {
      setBookNames(response.data);
    });
  };

  const handleSubmit = () => {
    setBookNames([...bookNames, inputValue]);
    setInputValue("");
  };
  const handleRemove = (index) => {
    const newBookNames = [...bookNames];
    newBookNames.splice(index, 1);
    setBookNames(newBookNames);
  };
  const handleEdit = (index) => {
    setShowsEdit(true);
    setSelectedIndex(index);
    setInputValue(bookNames[index]);
  };
  const completeEdit = () => {
    setShowsEdit(false);
    setInputValue("");
    bookNames[selectedIndex] = inputValue;
  };

  return (
    <div>
      <h1>Welcome to Book Store!!</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onInput={(e) => setInputValue(e.target.value)}
        />
        {showsEdit ? (
          <button onClick={completeEdit}>complete editing</button>
        ) : (
          <button onClick={handleSubmit}>Add Book</button>
        )}
      </div>
      <ul>
        {bookNames.map((bookName, index) => (
          <li key={index}>
            <button onClick={() => handleEdit(index)}>edit</button>
            <span>{bookName}</span>
            <span onClick={() => handleRemove(index)}> X</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
