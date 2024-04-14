package com.example.BooksBackend.books;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByAuthorId(Long authorId);
    Optional<Book> findByTitle(String title);
    @Query("SELECT b FROM Book b WHERE lower(b.title) LIKE %:searchTerm% OR lower(b.genre) LIKE %:searchTerm%")
    List<Book> findByTitleOrGenre(@Param("searchTerm") String searchTerm);

}


