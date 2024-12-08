import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Card, Row, Col } from "react-bootstrap";
import BookModal from "./components/BookModal";
import apiClient from "../../../configs/ApiClient";

interface BookData {
  bookID: number;
  title: string;
  author: string;
  genre?: string;
  price: number;
  stockQuantity: number;
  isbn?: string;
  publishedDate?: string;
}

const Book: React.FC = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentBook, setCurrentBook] = useState<Partial<BookData>>({});
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await apiClient.get("/Book");
        console.log("Fetched books:", response);
        setBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleOpenModal = (book?: BookData) => {
    if (book) {
      setCurrentBook(book);
      setIsEdit(true);
    } else {
      setCurrentBook({});
      setIsEdit(false);
    }
    setShowModal(true);
  };

  const handleSaveBook = (book: BookData) => {
    if (isEdit) {
      setBooks((prevBooks) =>
        prevBooks.map((b) => (b.bookID === book.bookID ? { ...b, ...book } : b))
      );
    } else {
      setBooks((prevBooks) => [
        ...prevBooks,
        { ...book, bookID: prevBooks.length + 1 },
      ]);
    }
    setShowModal(false);
  };

  const handleDeleteBook = (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.bookID !== id));
  };

  return (
    <Card className="p-4 shadow-sm">
      <Row className="mb-4">
        <Col>
          <h2>Books</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => handleOpenModal()}>
            + Add New Book
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <p>Loading books...</p>
      ) : (
        <Table responsive bordered hover className="align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Price ($)</th>
              <th>Stock</th>
              <th>ISBN</th>
              <th>Published Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.bookID}>
                <td>{book.bookID}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre || "N/A"}</td>
                <td>{book.price.toFixed(2)}</td>
                <td>
                  {book.stockQuantity > 0 ? (
                    <Badge bg="success">{book.stockQuantity} in stock</Badge>
                  ) : (
                    <Badge bg="danger">Out of stock</Badge>
                  )}
                </td>
                <td>{book.isbn || "N/A"}</td>
                <td>{book.publishedDate?.split("T")[0] || "N/A"}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleOpenModal(book)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteBook(book.bookID)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <BookModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveBook}
        initialBook={currentBook}
        isEdit={isEdit}
      />
    </Card>
  );
};

export default Book;
