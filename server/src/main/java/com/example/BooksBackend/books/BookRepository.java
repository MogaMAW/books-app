package com.example.BooksBackend.books;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByAuthorId(Long authorId);
    Optional<Book> findByTitle(String title);

}


