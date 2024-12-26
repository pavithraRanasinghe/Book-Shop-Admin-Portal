import React from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./BookDetail.module.css";
import { BookData } from "../../model/Book";

interface BookDetailModalProps {
  show: boolean;
  onClose: () => void;
  book: BookData | null;
  onAddToCart: (book: BookData) => void;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({
  show,
  onClose,
  book,
  onAddToCart,
}) => {
  if (!book) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{book.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalContent}>
          <img
            src={book.image || "/path/to/default-image.jpg"} // Use default image if not provided
            alt={book.title}
            className={styles.modalImage}
          />
          <div className={styles.modalDetails}>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Price:</strong> ${book.price.toFixed(2)}
            </p>
            <p>
              <strong>Genre:</strong> {book.genre || "Not specified"}
            </p>
            <p>
              <strong>Stock:</strong> {book.stockQuantity}
            </p>
            {book.isbn && (
              <p>
                <strong>ISBN:</strong> {book.isbn}
              </p>
            )}
            {book.publishedDate && (
              <p>
                <strong>Published Date:</strong>{" "}
                {new Date(book.publishedDate).toLocaleDateString()}
              </p>
            )}
            {book.description && <p>{book.description}</p>}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onAddToCart(book);
            onClose(); // Optionally close modal after adding to cart
          }}
        >
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookDetailModal;
