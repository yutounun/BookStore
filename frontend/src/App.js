import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import {
  Stack,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchBooksData().finally(() => {
      setIsLoading(false);
    });
  }, []);

  /**
   * Fetches data of books from the server and sets the book names to the state.
   * @returns {void}
   */
  const fetchBooksData = () => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/books`)
      .then((response) => {
        setBooks(response.data);
      });
  };

  /**
   * Posts book data to the server.
   *
   * @return {Promise} A Promise that resolves with the server's response data.
   */
  const postBookData = () => {
    return axios.post(`${process.env.REACT_APP_API_URL}/books`, inputValues);
  };

  const deleteBookData = (id) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}/books/${id}`);
  };

  const putBookData = (id) => {
    return axios.put(
      `${process.env.REACT_APP_API_URL}/books/${id}`,
      inputValues
    );
  };

  /**
   * Adds the current input value to the list of book names, and resets the input field.
   * @function handleSubmit
   */
  const handleSubmit = async () => {
    setIsLoading(true);
    postBookData()
      .then(fetchBooksData)
      .finally(() => {
        setInputValues(emptyInput);
        setIsLoading(false);
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
    setIsLoading(true);
    putBookData(selectedId)
      .then(() => {
        setShowsEdit(false);
        setInputValues(emptyInput);
        fetchBooksData();
      })
      .finally(() => {
        setIsLoading(true);
      });
  };
  const msg = "aa";

  return (
    <>
      <Stack alignItems="center" mt={3} mb={5}>
        <Stack direction="row" itemsAlign="center" justifyContent="center">
          <Typography variant="h3" justifyContent="center" itemAligns="center">
            Book Store{isLoading}
          </Typography>
          <ImportContactsIcon fontSize="large"></ImportContactsIcon>
        </Stack>
        <Stack width={"30%"} spacing={5}>
          <Stack spacing={2}>
            <span>タイトル</span>
            <TextField
              type="text"
              value={inputValues.title}
              onInput={(e) =>
                setInputValues({ ...inputValues, title: e.target.value })
              }
            />
          </Stack>
          <Stack spacing={2}>
            <span>著者</span>
            <TextField
              type="text"
              value={inputValues.author}
              onInput={(e) =>
                setInputValues({ ...inputValues, author: e.target.value })
              }
            />
          </Stack>
          <Stack spacing={2}>
            <span>概要</span>
            <TextField
              type="text"
              value={inputValues.overview}
              onInput={(e) =>
                setInputValues({ ...inputValues, overview: e.target.value })
              }
            />
          </Stack>
          <Stack mt={2} alignItems="center">
            {showsEdit ? (
              <Button
                color={"primary"}
                variant="contained"
                onClick={completeEdit}
              >
                complete editing
              </Button>
            ) : (
              <Button
                color={"primary"}
                variant="contained"
                onClick={handleSubmit}
              >
                Add Book{showsEdit}
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>

      <Stack alignItems="center" mt={3} mb={5}>
        {isLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <TableContainer component={Paper} style={{ width: "70%" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>OverView</TableCell>
                  <TableCell>CreatedAt</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books
                  ? books.map((book) => (
                      <TableRow
                        key={book.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {book.title}
                        </TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.overview}</TableCell>
                        <TableCell>{book.created_at}</TableCell>
                        <TableCell>
                          <EditIcon onClick={() => handleEdit(book)}>
                            edit
                          </EditIcon>
                        </TableCell>
                        <TableCell>
                          <RemoveCircleOutlineIcon
                            onClick={() => handleRemove(book.id)}
                          ></RemoveCircleOutlineIcon>
                        </TableCell>
                      </TableRow>
                    ))
                  : "a"}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </>
  );
}

export default App;
