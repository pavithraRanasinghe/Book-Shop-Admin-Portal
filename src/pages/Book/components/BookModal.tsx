import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";
import styles from "./BookModal.module.css";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  stock: number;
}

interface BookModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (book: Book) => void;
  initialBook?: Partial<Book>;
  isEdit: boolean;
}

const BookModal: React.FC<BookModalProps> = ({
  show,
  onClose,
  onSave,
  initialBook,
  isEdit,
}) => {
  const [book, setBook] = useState<Partial<Book>>(initialBook || {});
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setBook(initialBook || {});
    setError(""); // Clear errors when modal opens
  }, [initialBook]);

  const handleChange = (field: keyof Book, value: string | number) => {
    setBook({ ...book, [field]: value });
  };

  const handleSubmit = () => {
    if (
      !book.title ||
      !book.author ||
      book.price === undefined ||
      book.stock === undefined
    ) {
      setError("Please fill in all fields correctly.");
      return;
    }
    setError("");
    onSave(book as Book);
    onClose();
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
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  className={styles.formControl}
                  type="number"
                  placeholder="Enter stock quantity"
                  value={book.stock || ""}
                  onChange={(e) =>
                    handleChange("stock", parseInt(e.target.value, 10))
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
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className={styles.saveButton}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookModal;
