import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import styles from "./Home.module.css";
import fictionImage from "../../../assets/images/fictional.jpg";
import nonFictionImage from "../../../assets/images/non-fiction.jpg";
import childrenImage from "../../../assets/images/children.jpg";
import selfHelpImage from "../../../assets/images/self-help.jpg";
import mysteryVaultImage from "../../../assets/images/cover/353b5527-761f-48e4-acdf-4e1c48de30c6.jpg";
import adventuresBeyondImage from "../../../assets/images/cover/6421e74fb71478fd7d060b2eb0f53d86.png";
import rustyMysteryImage from "../../../assets/images/cover/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg";
import ceremonyWoodsImage from "../../../assets/images/cover/Ceremony-of-the-woods.-textss-324x519.jpg";
import specialOfferImage from "../../../assets/images/special.jpg";

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
            {[
              {
                imagePath: mysteryVaultImage,
                title: "The Bad Guys",
                cost: "$19.99",
              },
              {
                imagePath: adventuresBeyondImage,
                title: "In your own backyard",
                cost: "$24.99",
              },
              {
                imagePath: rustyMysteryImage,
                title: "Soul",
                cost: "$15.99",
              },
              {
                imagePath: ceremonyWoodsImage,
                title: "Ceremony of the Woods",
                cost: "$29.99",
              },
            ].map((book, index) => (
              <Col md={3} sm={6} key={index} className="mb-4">
                <Card className={styles.bookCard}>
                  <Card.Img
                    variant="top"
                    src={book.imagePath}
                    className={styles.featureImage}
                  />
                  <Card.Body>
                    <Card.Title className={styles.bookTitle}>
                      {book.title}
                    </Card.Title>
                    <Card.Text className={styles.bookPrice}>
                      {book.cost}
                    </Card.Text>
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
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img
                src={specialOfferImage}
                alt="Special Offer"
                className={styles.specialOfferImage}
              />
            </Col>
            <Col md={6} className="text-center text-md-start">
              <h2 className={styles.specialOfferTitle}>Special Offer!</h2>
              <p className={styles.specialOfferSubtitle}>
                Dive into the world of stories and knowledge with discounts of
                up to
                <strong> 50% </strong> on our bestsellers. Don’t miss out on
                this limited-time deal!
              </p>
              <Button className={styles.specialOfferButton} href="/offers">
                Explore Offers
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
