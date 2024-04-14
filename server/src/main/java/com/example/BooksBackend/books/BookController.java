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
@PreAuthorize("hasRole('ADMIN')")
public class BookController {
    final private BookService bookService;
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

    @GetMapping(path="/get/{bookId}")
    public ResponseEntity<Book> getBook(
            @PathVariable("bookId") Long bookId
        ){
        Book book= bookService.getBook(bookId);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @GetMapping(path="/get-all")
    public ResponseEntity<List<Book>> getAllBooks(
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "10") int limit
    ){
        List<Book> books = bookService.getAllBooks(offset, limit);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }


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
