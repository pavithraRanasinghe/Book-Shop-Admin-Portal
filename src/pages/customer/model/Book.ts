// src/model/Book.ts

export interface BookData {
  bookID: number; // Matches BookID from backend
  title: string;
  author: string;
  genre: string; // Updated from "category" to "genre"
  price: number;
  stockQuantity: number;
  isbn?: string; // Optional
  publishedDate?: string; // Optional, backend provides DateTime
  description?: string; // Optional, for detailed view
  image?: string; // Optional, for book cover images
}
