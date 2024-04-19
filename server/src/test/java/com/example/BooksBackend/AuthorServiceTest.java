package com.example.BooksBackend;

import com.example.BooksBackend.authors.*;
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

class AuthorServiceTest {

    @Mock
    private AuthorRepository authorRepository;

    @InjectMocks
    private AuthorService authorService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateAuthor() {
        String authorName = "Test Author";
        String bio = "Test Bio";
        Author author = Author.builder()
                .id(1L)
                .authorName(authorName)
                .bio(bio)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        when(authorRepository.findByAuthorName(authorName)).thenReturn(Optional.empty());
        when(authorRepository.save(any(Author.class))).thenReturn(author);

        Author createdAuthor = authorService.createAuthor(authorName, bio);

        assertNotNull(createdAuthor);
        assertEquals(authorName, createdAuthor.getAuthorName());
        assertEquals(bio, createdAuthor.getBio());
    }

    @Test
    void testCreateAuthorAlreadyExists() {
        String authorName = "Test Author";
        String bio = "Test Bio";

        when(authorRepository.findByAuthorName(authorName)).thenReturn(Optional.of(new Author()));

        assertThrows(BadRequestException.class, () -> authorService.createAuthor(authorName, bio));
    }

}

