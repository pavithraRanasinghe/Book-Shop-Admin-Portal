import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import styles from "./Home.module.css";
import fictionImage from "../../../assets/images/fictional.jpg";
import nonFictionImage from "../../../assets/images/non-fiction.jpg";
import childrenImage from "../../../assets/images/children.jpg";
import selfHelpImage from "../../../assets/images/self-help.jpg";

const Home: React.FC = () => {
  const categories = [
    {
      name: "Fiction",
      image: fictionImage,
    },
    {
      name: "Non-Fiction",
      image: nonFictionImage,
    },
    {
      name: "Children's Books",
      image: childrenImage,
    },
    {
      name: "Self-Help",
      image: selfHelpImage,
    },
  ];

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Container className="text-center">
          <h1 className={styles.heroTitle}>Welcome to Book Haven</h1>
          <p className={styles.heroSubtitle}>
            Discover your next great read with us.
          </p>
          <Button className={styles.heroButton} href="#categories">
            Browse Categories
          </Button>
        </Container>
      </section>

      {/* Categories Section */}
      <section className={styles.categoriesSection} id="categories">
        <Container>
          <h2 className={styles.sectionTitle}>Shop by Categories</h2>
          <Row>
            {categories.map((category, index) => (
              <Col md={3} sm={6} key={index} className="mb-4">
                <Card className={styles.categoryCard}>
                  <Card.Img
                    variant="top"
                    src={category.image}
                    alt={category.name}
                    className={styles.categoryImage}
                  />
                  <Card.Body>
                    <Card.Title className={styles.categoryTitle}>
                      {category.name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Books Section */}
      <section className={styles.featuredBooksSection}>
        <Container>
          <h2 className={styles.sectionTitle}>Featured Books</h2>
          <Row>
            {Array.from({ length: 4 }).map((_, index) => (
              <Col md={3} sm={6} key={index} className="mb-4">
                <Card className={styles.bookCard}>
                  <Card.Img
                    variant="top"
                    src={`https://via.placeholder.com/200x300?text=Book+${
                      index + 1
                    }`}
                    className={styles.bookImage}
                  />
                  <Card.Body>
                    <Card.Title className={styles.bookTitle}>
                      Book Title {index + 1}
                    </Card.Title>
                    <Card.Text className={styles.bookPrice}>$19.99</Card.Text>
                    <Button
                      variant="primary"
                      className={styles.addToCartButton}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Special Offer Section */}
      <section className={styles.specialOfferSection}>
        <Container className="text-center">
          <h2 className={styles.specialOfferTitle}>Special Offer!</h2>
          <p className={styles.specialOfferSubtitle}>
            Get up to 50% off on selected books.
          </p>
          <Button className={styles.specialOfferButton} href="/offers">
            Shop Now
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default Home;
