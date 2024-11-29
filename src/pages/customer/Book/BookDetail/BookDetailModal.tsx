import React from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./BookDetail.module.css";
import { BookData } from "../../model/Book";

interface BookDetailModalProps {
  show: boolean;
  onClose: () => void;
  book: BookData | undefined;
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
            src={book.image}
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
              <strong>Category:</strong> {book.category}
            </p>
            <p>{book.description}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onAddToCart(book)}>
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookDetailModal;
