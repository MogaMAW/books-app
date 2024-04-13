package com.example.BooksBackend.authors;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/authors")
public class AuthorController {
    final private AuthorService authorService;

    @PostMapping("/create")
    public ResponseEntity<Author> createAuthor(
            @RequestBody CreateAuthorRequest request
    ) {
        Author newAuthor = authorService.createAuthor(
                request.getAuthorName(),
                request.getBio());
        return new ResponseEntity<>(newAuthor, HttpStatus.CREATED);
    }

    @PutMapping(path="/update/{authorId}")
    public ResponseEntity<Author> updateAuthor(
            @PathVariable("authorId") Long authorId,
            @RequestBody UpdateAuthorRequest request
    ) {
        Author updatedAuthor = authorService.updateAuthor(authorId, request.getAuthorName(), request.getBio());
        return new ResponseEntity<>(updatedAuthor, HttpStatus.OK);
    }

    @GetMapping(path="/get/{authorId}")
    public ResponseEntity<Author> getAuthor(
            @PathVariable("authorId") Long authorId
    ){
        Author author= authorService.getAuthor(authorId);
        return new ResponseEntity<>(author, HttpStatus.OK);
    }

    @GetMapping(path="/get-all")
    public ResponseEntity<List<Author>> getAllAuthor(){
        List<Author> authors= authorService.getAllAuthors();
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @DeleteMapping(path="/delete/{authorId}")
    public ResponseEntity<GeneralResponse> deleteStudent(
            @PathVariable("authorId") Long authorId
    ){
        authorService.deleteAuthor(authorId);

        GeneralResponse deleteResponse = new GeneralResponse();
        deleteResponse.setMessage("Author deleted successfully");
        deleteResponse.setStatusCode(200);

        return ResponseEntity.ok(deleteResponse);
    }

}