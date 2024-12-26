import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import styles from "./Book.module.css";
import BookDetailModal from "./BookDetail/BookDetailModal";
import { BookData } from "../model/Book";
import apiClient from "../../../configs/ApiClient";

const BookPage: React.FC = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<BookData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);

  // Fetch books from the API
  const fetchBooks = async (term: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/Book/search", {
        params: {
          searchTerm: term,
        },
      });
      setBooks(response.data);
    } catch (err) {
      setError("Failed to fetch books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(""); // Fetch all books on initial load
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchBooks(term); // Fetch books based on search term
  };

  const handleAddToCart = (book: BookData) => {
    setCart((prevCart) => [...prevCart, book]);
    alert(`${book.title} has been added to your cart!`);
  };

  const handleViewDetails = (book: BookData) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  // Extract unique genres from books data
  const genres = Array.from(new Set(books.map((book: any) => book.genre)));

  return (
    <div className={styles.bookPage}>
      <Container>
        <h2 className={styles.pageTitle}>Find Your Next Great Read</h2>

        {/* Search Bar */}
        <Form className={styles.searchForm}>
          <Form.Control
            type="text"
            placeholder="Search for a book by title or author..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </Form>

        {loading ? (
          <Spinner animation="border" className="d-block mx-auto mt-4" />
        ) : error ? (
          <Alert variant="danger" className="mt-4">
            {error}
          </Alert>
        ) : (
          genres.map((genre) => (
            <div key={genre}>
              <h3 className={styles.categoryTitle}>{genre || "Other"}</h3>
              <Row className="mt-4">
                {books
                  .filter((book) => book.genre === genre)
                  .map((book) => (
                    <Col md={3} sm={6} key={book.bookID} className="mb-4">
                      <Card
                        className={styles.bookCard}
                        onClick={() => handleViewDetails(book)}
                      >
                        <Card.Img
                          variant="top"
                          src={book.image || "/path/to/default-image.jpg"} // Add default image path if not provided
                          alt={book.title}
                          className={styles.bookImage}
                        />
                        <Card.Body>
                          <Card.Title className={styles.bookTitle}>
                            {book.title}
                          </Card.Title>
                          <Card.Text className={styles.bookAuthor}>
                            By {book.author}
                          </Card.Text>
                          <Card.Text className={styles.bookPrice}>
                            ${book.price.toFixed(2)}
                          </Card.Text>
                          <Button
                            variant="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(book);
                            }}
                            className={styles.addToCartButton}
                          >
                            Add to Cart
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          ))
        )}

        <BookDetailModal
          show={showModal}
          onClose={() => setShowModal(false)}
          book={selectedBook}
          onAddToCart={handleAddToCart}
        />
      </Container>
    </div>
  );
};

export default BookPage;
