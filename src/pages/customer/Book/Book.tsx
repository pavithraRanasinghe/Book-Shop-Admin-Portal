import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import styles from "./Book.module.css";
import BookDetailModal from "./BookDetail/BookDetailModal";
import { BookData } from "../model/Book";

const booksData: BookData[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 10.99,
    category: "Fiction",
    image: "https://via.placeholder.com/150x200?text=Book+1",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    price: 8.99,
    category: "Fiction",
    image: "https://via.placeholder.com/150x200?text=Book+2",
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    price: 15.99,
    category: "Self-Help",
    image: "https://via.placeholder.com/150x200?text=Book+3",
  },
  {
    id: 4,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 12.49,
    category: "Fiction",
    image: "https://via.placeholder.com/150x200?text=Book+4",
  },
  {
    id: 5,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    price: 14.99,
    category: "Self-Help",
    image: "https://via.placeholder.com/150x200?text=Book+5",
  },
  {
    id: 6,
    title: "Green Eggs and Ham",
    author: "Dr. Seuss",
    price: 5.99,
    category: "Children's Books",
    image: "https://via.placeholder.com/150x200?text=Book+6",
  },
];

const BookPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<BookData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookData>();

  console.log(cart);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddToCart = (book: BookData) => {
    setCart((prevCart) => [...prevCart, book]);
    alert(`${book.title} has been added to your cart!`);
  };

  const handleViewDetails = (book: BookData) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const categories = Array.from(
    new Set(booksData.map((book) => book.category))
  );

  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.bookPage}>
      <Container>
        <h2 className={styles.pageTitle}>Find Your Next Great Read</h2>

        {/* Search Bar */}
        <Form className={styles.searchForm}>
          <Form.Control
            type="text"
            placeholder="Search for a book by title..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </Form>

        {/* Book Categories */}
        {categories.map((category) => (
          <div key={category}>
            <h3 className={styles.categoryTitle}>{category}</h3>
            <Row className="mt-4">
              {filteredBooks
                .filter((book) => book.category === category)
                .map((book) => (
                  <Col md={3} sm={6} key={book.id} className="mb-4">
                    <Card
                      className={styles.bookCard}
                      onClick={() => handleViewDetails(book)}
                    >
                      <Card.Img
                        variant="top"
                        src={book.image}
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
                          onClick={() => handleAddToCart(book)}
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
        ))}
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
