package com.example.BooksBackend;

import com.example.BooksBackend.books.*;
import com.example.BooksBackend.exception.BadRequestException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookService bookService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateBook() {
        Long authorId = 1L;
        String title = "Test Book";
        String isbn = "1234567890";
        String publicationYear = "2023";
        String genre = "Fiction";

        Book book = Book.builder()
                .id(1L)
                .authorId(authorId)
                .title(title)
                .isbn(isbn)
                .publicationYear(publicationYear)
                .genre(genre)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        when(bookRepository.findByTitle(title)).thenReturn(Optional.empty());
        when(bookRepository.save(any(Book.class))).thenReturn(book);

        Book createdBook = bookService.createBook(authorId, title, isbn, publicationYear, genre);

        assertNotNull(createdBook);
        assertEquals(title, createdBook.getTitle());
        assertEquals(authorId, createdBook.getAuthorId());
    }

    @Test
    void testCreateBookAlreadyExists() {
        String title = "Test Book";

        when(bookRepository.findByTitle(title)).thenReturn(Optional.of(new Book()));

        assertThrows(BadRequestException.class, () ->
                bookService.createBook(1L, title, "1234567890", "2023", "Fiction"));
    }

}

