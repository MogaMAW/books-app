package com.example.BooksBackend.books;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/books")
public class BookController {
    final private BookService bookService;
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<Book> createBook(
            @RequestBody CreateBookRequest request
    ) {
        Book newBook = bookService.createBook(
                request.getAuthorId(),
                request.getTitle(),
                request.getIsbn(),
                request.getPublicationYear(),
                request.getGenre()
        );
        return new ResponseEntity<>(newBook, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(path="/update/{bookId}")
    public ResponseEntity<Book> updateBook(
            @PathVariable("bookId") Long bookId,
            @RequestBody UpdateAuthorRequest request
    ) {
        Book updatedBook = bookService.updateBook(
                bookId,
                request.getAuthorId(),
                request.getTitle(),
                request.getIsbn(),
                request.getPublicationYear(),
                request.getGenre());
        return new ResponseEntity<>(updatedBook, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(path="/get/{bookId}")
    public ResponseEntity<Book> getBook(
            @PathVariable("bookId") Long bookId
        ){
        Book book= bookService.getBook(bookId);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }


    @PreAuthorize("permitAll()")
    @GetMapping(path="/get-all")
    public ResponseEntity<List<Book>> getAllBooks(
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "10") int limit
    ){
        List<Book> books = bookService.getAllBooks(offset, limit);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(path="/get-by-author/{authorId}")
    public ResponseEntity<List<Book>> getBooksByAuthorId(
            @PathVariable("authorId") Long authorId
    ){
        List<Book> books = bookService.getBooksByAuthorId(authorId);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(path="/search")
    public ResponseEntity<List<Book>> searchBooks(
            @RequestParam("searchTerm") String searchTerm
    ){
        List<Book> books = bookService.searchBooks(searchTerm);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(path="/delete/{bookId}")
    public ResponseEntity<GeneralBookResponse> deleteBook(
            @PathVariable("bookId") Long bookId
    ){
        bookService.deleteBook(bookId);
        GeneralBookResponse deleteResponse = new GeneralBookResponse();
        deleteResponse.setMessage("Book deleted successfully");
        deleteResponse.setStatusCode(200);

        return ResponseEntity.ok(deleteResponse);
    }

}
