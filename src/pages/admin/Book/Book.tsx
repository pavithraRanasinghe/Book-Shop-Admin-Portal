import React, { useState } from "react";
import { Table, Button, Badge, Card, Row, Col } from "react-bootstrap";
import BookModal from "./components/BookModal";

interface BookData {
  id: number;
  title: string;
  author: string;
  price: number;
  stock: number;
}

const Book: React.FC = () => {
  const [books, setBooks] = useState<BookData[]>([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 10.99,
      stock: 5,
    },
    { id: 2, title: "1984", author: "George Orwell", price: 8.99, stock: 12 },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 12.49,
      stock: 0,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentBook, setCurrentBook] = useState<Partial<BookData>>({});
  const [isEdit, setIsEdit] = useState(false);

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
        prevBooks.map((b) => (b.id === book.id ? { ...b, ...book } : b))
      );
    } else {
      setBooks((prevBooks) => [
        ...prevBooks,
        { ...book, id: prevBooks.length + 1 },
      ]);
    }
    setShowModal(false);
  };

  const handleDeleteBook = (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
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
      <Table responsive bordered hover className="align-middle">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price ($)</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.price.toFixed(2)}</td>
              <td>
                {book.stock > 0 ? (
                  <Badge bg="success">{book.stock} in stock</Badge>
                ) : (
                  <Badge bg="danger">Out of stock</Badge>
                )}
              </td>
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
                  onClick={() => handleDeleteBook(book.id)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
