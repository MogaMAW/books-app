package com.example.BooksBackend.books;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateAuthorRequest {
    private Long bookId;
    private Long authorId;
    private String title;
    private String isbn;
    private String publicationYear;
    private String genre;
}

