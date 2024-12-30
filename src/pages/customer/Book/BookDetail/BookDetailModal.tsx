import React, { useState } from "react";
import { Modal, Button, FormControl, InputGroup, Alert } from "react-bootstrap";
import styles from "./BookDetail.module.css";
import { BookData } from "../../model/Book";
import apiClient from "../../../../configs/ApiClient";
import FeedbackSection from "../../FeedbackSection/FeedbackSection";

interface BookDetailModalProps {
  show: boolean;
  onClose: () => void;
  book: BookData | null;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({
  show,
  onClose,
  book,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const userId = localStorage.getItem("userId");

  if (!book) return null;

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(
      1,
      Math.min(book.stockQuantity, Number(event.target.value))
    );
    setQuantity(value);
  };

  const handleAddToCart = async () => {
    // Validate quantity before calling the API
    if (quantity < 1 || quantity > book.stockQuantity) {
      setError("Please enter a valid quantity within the available stock.");
      setSuccess(null);
      return;
    }

    try {
      await apiClient.post("/Cart", {
        UserID: parseInt(userId || "0"),
        BookID: book.bookID,
        Quantity: quantity,
      });

      setSuccess("Book successfully added to cart!");
      setError(null);

      setTimeout(onClose, 1500);
    } catch (err: any) {
      setError("Failed to add to cart. Please try again.");
      setSuccess(null);
    }
  };

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
        <div className="mt-3">
          <strong>Quantity:</strong>
          <InputGroup className="mt-2">
            <FormControl
              type="number"
              min={1}
              max={book.stockQuantity}
              value={quantity}
              onChange={handleQuantityChange}
            />
          </InputGroup>
          <p className="text-muted">Max available: {book.stockQuantity}</p>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        {userId && <FeedbackSection bookId={book.bookID} />}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleAddToCart}
          disabled={quantity < 1 || quantity > book.stockQuantity}
        >
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookDetailModal;
