import com.example.BooksBackend.authors.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthorControllerTest {

    @Mock
    private AuthorService authorService;

    @InjectMocks
    private AuthorController authorController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateAuthor() {
        CreateAuthorRequest request = new CreateAuthorRequest("Test Author", "Test Bio");
        Author author = Author.builder()
                .id(1L)
                .authorName(request.getAuthorName())
                .bio(request.getBio())
                .build();

        when(authorService.createAuthor(any(String.class), any(String.class))).thenReturn(author);

        ResponseEntity<Author> responseEntity = authorController.createAuthor(request);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(author, responseEntity.getBody());
    }

    @Test
    void testUpdateAuthor() {
        Long authorId = 1L;
        UpdateAuthorRequest request = new UpdateAuthorRequest(authorId, "Updated Author Name", "Updated Bio");
        Author author = Author.builder()
                .id(authorId)
                .authorName(request.getAuthorName())
                .bio(request.getBio())
                .build();

        when(authorService.updateAuthor(authorId, request.getAuthorName(), request.getBio())).thenReturn(author);

        ResponseEntity<Author> responseEntity = authorController.updateAuthor(authorId, request);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(author, responseEntity.getBody());
    }

    // Add similar tests for other methods in AuthorController
}

