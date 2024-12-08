import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import styles from "./Book.module.css";
import BookDetailModal from "./BookDetail/BookDetailModal";
import { BookData } from "../model/Book";
import contemporaryFictionImage from "../../../assets/images/cover/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg";
import harryPotterImage from "../../../assets/images/cover/harry-potter-deathly-hallows-book-cover-i214933.jpg";
import rustyMysteryImage from "../../../assets/images/cover/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg";
import mountainImage from "../../../assets/images/cover/the-mountain.jpg";
import ceremonyWoodsImage from "../../../assets/images/cover/Ceremony-of-the-woods.-textss-324x519.jpg";
import wornImage from "../../../assets/images/cover/worn-3-678x1024.jpg";
import placeholderImage from "../../../assets/images/cover/image-placeholder-title.jpg";
import largeImage from "../../../assets/images/cover/large_7c4c00ee056decdc83cfa053ae29593c.jpg";
import fictionNightImage from "../../../assets/images/cover/fiction-night-time-book-cover-template-design-87d07261137ca6f86d01f5758930d203_screen.jpg";
import imagePlaceholderImage from "../../../assets/images/cover/e50c016f-b6a8-4666-8fb8-fe6bd5fd9fec_rw_1920.jpeg";

const booksData: BookData[] = [
  {
    id: 1,
    title: "The Enigmatic Night",
    author: "Liam Carter",
    price: 12.99,
    category: "Fiction",
    image: contemporaryFictionImage,
  },
  {
    id: 2,
    title: "Harry Potter: The Deathly Hallows",
    author: "J.K. Rowling",
    price: 18.99,
    category: "Fantasy",
    image: harryPotterImage,
  },
  {
    id: 3,
    title: "Rusty Mystery",
    author: "Eleanor Woods",
    price: 10.49,
    category: "Mystery",
    image: rustyMysteryImage,
  },
  {
    id: 4,
    title: "Beyond the Mountain",
    author: "Ava Collins",
    price: 15.75,
    category: "Adventure",
    image: mountainImage,
  },
  {
    id: 5,
    title: "Ceremony of the Woods",
    author: "Sophia Reed",
    price: 9.99,
    category: "Mystery",
    image: ceremonyWoodsImage,
  },
  {
    id: 6,
    title: "The Forgotten Path",
    author: "Lucas Taylor",
    price: 13.89,
    category: "Self-Help",
    image: wornImage,
  },
  {
    id: 7,
    title: "Placeholder Dreams",
    author: "Emily Grace",
    price: 7.99,
    category: "Fiction",
    image: placeholderImage,
  },
  {
    id: 8,
    title: "Large Imaginations",
    author: "William Cole",
    price: 11.99,
    category: "Children's Books",
    image: largeImage,
  },
  {
    id: 9,
    title: "Fictional Nights",
    author: "Oliver James",
    price: 16.49,
    category: "Fiction",
    image: fictionNightImage,
  },
  {
    id: 10,
    title: "Eternal Placeholder",
    author: "Charlotte Hill",
    price: 6.99,
    category: "Fantasy",
    image: imagePlaceholderImage,
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
