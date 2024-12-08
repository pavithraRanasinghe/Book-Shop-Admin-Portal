import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";
import styles from "./BookModal.module.css";
import apiClient from "../../../../configs/ApiClient";

interface BookData {
  bookID: number; // TODO Optional for new books
  title: string;
  author: string;
  genre?: string;
  price: number;
  stockQuantity: number;
  isbn?: string;
  publishedDate?: string;
}

interface BookModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (book: BookData) => void; // Callback to update parent state
  initialBook?: Partial<BookData>;
  isEdit: boolean;
}

const BookModal: React.FC<BookModalProps> = ({
  show,
  onClose,
  onSave,
  initialBook,
  isEdit,
}) => {
  const [book, setBook] = useState<Partial<BookData>>(initialBook || {});
  const [error, setError] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    setBook(initialBook || {});
    setError(""); // Clear errors when modal opens
  }, [initialBook]);

  const handleChange = (field: keyof BookData, value: string | number) => {
    setBook({ ...book, [field]: value });
  };

  const handleSubmit = async () => {
    if (
      !book.title ||
      !book.author ||
      book.price === undefined ||
      book.stockQuantity === undefined
    ) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    setError("");
    setIsSaving(true);

    try {
      const payload: any = {
        title: book.title,
        author: book.author,
        genre: book.genre,
        price: book.price,
        stockQuantity: book.stockQuantity,
        isbn: book.isbn,
        publishedDate: book.publishedDate,
      };

      const response = await apiClient.post("/Book", payload);
      onSave(response.data); // Notify parent with saved book data
      onClose(); // Close the modal
    } catch (err: any) {
      setError(
        err.response?.data || "Failed to save the book. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>
          {isEdit ? "Edit Book" : "Add New Book"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger" className={styles.validationAlert}>
            {error}
          </Alert>
        )}
        <Form>
          <Row>
            <Col md={12}>
              <Form.Group className={styles.formGroup} controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  className={styles.formControl}
                  type="text"
                  placeholder="Enter book title"
                  value={book.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className={styles.formGroup} controlId="formAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  className={styles.formControl}
                  type="text"
                  placeholder="Enter author name"
                  value={book.author || ""}
                  onChange={(e) => handleChange("author", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className={styles.formGroup} controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  className={styles.formControl}
                  type="number"
                  placeholder="Enter book price"
                  value={book.price || ""}
                  onChange={(e) =>
                    handleChange("price", parseFloat(e.target.value))
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className={styles.formGroup} controlId="formStock">
                <Form.Label>Stock Quantity</Form.Label>
                <Form.Control
                  className={styles.formControl}
                  type="number"
                  placeholder="Enter stock quantity"
                  value={book.stockQuantity || ""}
                  onChange={(e) =>
                    handleChange("stockQuantity", parseInt(e.target.value, 10))
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className={styles.formGroup} controlId="formGenre">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  className={styles.formControl}
                  type="text"
                  placeholder="Enter genre"
                  value={book.genre || ""}
                  onChange={(e) => handleChange("genre", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className={styles.formGroup} controlId="formISBN">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  className={styles.formControl}
                  type="text"
                  placeholder="Enter ISBN"
                  value={book.isbn || ""}
                  onChange={(e) => handleChange("isbn", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group
                className={styles.formGroup}
                controlId="formPublishedDate"
              >
                <Form.Label>Published Date</Form.Label>
                <Form.Control
                  className={styles.formControl}
                  type="date"
                  value={book.publishedDate?.split("T")[0] || ""}
                  onChange={(e) =>
                    handleChange("publishedDate", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button
          variant="secondary"
          className={styles.cancelButton}
          onClick={onClose}
          disabled={isSaving}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className={styles.saveButton}
          onClick={handleSubmit}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookModal;
