package com.example.BooksBackend.books;

import com.example.BooksBackend.exception.BadRequestException;
import com.example.BooksBackend.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public Book createBook( Long authorId, String title, String isbn, String publicationYear, String genre) {
        Optional<Book> book = bookRepository.findByTitle(title);

        if (book.isPresent()) {
            throw new BadRequestException("Book of provided title is already added");
        }
        Book newBook = Book.builder()
                .authorId(authorId)
                .title(title)
                .isbn(isbn)
                .publicationYear(publicationYear)
                .genre(genre)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        return bookRepository.save(newBook);
    }

    @Transactional
    public Book updateBook(Long bookId, Long authorId, String title, String isbn, String publicationYear, String genre) {
        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new ResourceNotFoundException("Book with id " + bookId + " does not exists")
        );

        if (authorId != null && authorId>0 && !Objects.equals(book.getAuthorId(), authorId)) {
            book.setAuthorId(authorId);
            book.setUpdatedAt(LocalDateTime.now());
        }

        if (title != null && title.length()>0 && !Objects.equals(book.getTitle(), title)) {
            Optional<Book> bookOptional = bookRepository.findByTitle(title);
            if (bookOptional.isPresent()) {
                throw new BadRequestException("Can't Update to already added title");
            }
            book.setTitle(title);
            book.setUpdatedAt(LocalDateTime.now());
        }

        if (isbn != null && isbn.length()>0 && !Objects.equals(book.getIsbn(), isbn)) {
            book.setIsbn(isbn);
            book.setUpdatedAt(LocalDateTime.now());
        }

        if (publicationYear != null && publicationYear.length()>0 && !Objects.equals(book.getPublicationYear(), publicationYear)) {
            book.setPublicationYear(publicationYear);
            book.setUpdatedAt(LocalDateTime.now());
        }

        if (genre != null && genre.length()>0 && !Objects.equals(book.getGenre(), genre)) {
            book.setGenre(publicationYear);
            book.setUpdatedAt(LocalDateTime.now());
        }

        bookRepository.save(book);
        return book;
    }

    public Book getBook(Long bookId) {
        return bookRepository.findById(bookId).orElseThrow(
            () -> new ResourceNotFoundException("Book with id " + bookId + " does not exists")
        );
    }



    public List<Book> getAllBooks(int offset, int limit) {
        Pageable pageable = PageRequest.of(offset, limit, Sort.by("id").ascending());

        return bookRepository.findAll(pageable).getContent();
    }

    public List<Book> getBooksByAuthorId(Long authorId) {
        return bookRepository.findByAuthorId(authorId);
    }

    public void deleteBook(Long bookId) {
        Optional<Book> optionalBook = bookRepository.findById(bookId);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            bookRepository.delete(book);
        } else {
            throw new ResourceNotFoundException("Book with id " + bookId + " not found");
        }
    }

}

