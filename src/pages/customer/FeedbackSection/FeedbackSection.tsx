import React, { useState, useEffect } from "react";
import { Form, Button, ListGroup, Alert } from "react-bootstrap";
import apiClient from "../../../configs/ApiClient";

interface FeedbackSectionProps {
  bookId: number;
}

interface Feedback {
  feedbackID: number;
  bookID: number;
  comment: string;
  date: string;
  userName: string;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ bookId }) => {
  const [feedback, setFeedback] = useState<string>("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  // Fetch feedbacks when the component mounts
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await apiClient.get(`/Feedback/book/${bookId}`);
        setFeedbacks(response.data);
        setError(null);
      } catch (err: any) {
        setFeedbacks([]);
        setError(err.response?.data || "Failed to load feedbacks.");
      }
    };

    fetchFeedbacks();
  }, [bookId]);

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) {
      setError("Feedback cannot be empty.");
      setSuccess(null);
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      const userName = "You"; // Only for the newly added feedback

      const newFeedback: Feedback = {
        feedbackID: Math.random(),
        bookID: bookId,
        comment: feedback,
        date: new Date().toISOString(),
        userName: userName,
      };

      // Simulate POST request
      await apiClient.post("/Feedback", {
        BookID: bookId,
        UserID: parseInt(userId || "0"),
        Comment: feedback,
      });

      setFeedbacks((prev) => [...prev, newFeedback]);
      setFeedback("");
      setSuccess("Feedback submitted successfully!");
      setError(null);
    } catch (err: any) {
      setError("Failed to submit feedback. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div>
      <h5>Feedback</h5>
      {!openModal && (
        <Button onClick={() => setOpenModal(!openModal)} variant="primary">
          Add New Feedback
        </Button>
      )}
      {openModal && (
        <>
          <Form.Group controlId="feedbackForm" className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </Form.Group>
          <Button onClick={handleFeedbackSubmit} variant="primary">
            Submit Feedback
          </Button>
        </>
      )}
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mt-3">
          {success}
        </Alert>
      )}

      <h6 className="mt-4">User Feedback</h6>
      {feedbacks.length > 0 ? (
        <ListGroup>
          {feedbacks.map((fb) => (
            <ListGroup.Item key={fb.feedbackID}>
              <p>
                <strong>{fb.userName}</strong> (
                {new Date(fb.date).toLocaleDateString()}):
              </p>
              <p>{fb.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="text-muted">No feedback available yet.</p>
      )}
    </div>
  );
};

export default FeedbackSection;
