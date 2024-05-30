# API Documentation For BooksApp Endpoints

Need to reference the Swagger Springfox documentation? It's available at [https://moga-books-app.onrender.com/swagger-ui/index.html](https://moga-books-app.onrender.com/swagger-ui/index.html).

## Order Endpoints

### Create Order
### creating orders 

- **URL**: `/api/v1/orders/create`
- **Method**: POST
- **Description**: Creates a new order.
- **Authorization**: Required (ADMIN role)
- **Request Body**:
  ```json
  {
    "userId": "integer",
    "bookIds": "[list of integers representing book IDs]"
  }
  ```

<!-- ```` -->

- **Response**:
  - **201 Created**:
    ```json
    {
      "id": "integer",
      "userId": "integer",
      "status": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```

### Cancel Order

- **URL**: `/api/v1/orders/cancel/{orderId}`
- **Method**: PUT
- **Description**: Cancels an existing order.
- **Authorization**: Required (ADMIN role)
- **Request Parameters**:
  - `orderId`: The ID of the order to be cancelled.
- **Response**:
  - **200 OK**: No content

### Get Orders By User ID

- **URL**: `/api/v1/orders/get-by-user`
- **Method**: GET
- **Description**: Retrieves orders for a specific user.
- **Authorization**: Required (ADMIN role)
- **Request Parameters**:
  - `userId`: The ID of the user.
- **Response**:
  - **200 OK**:
    ```json
    [
      {
        "id": "integer",
        "userId": "integer",
        "status": "string",
        "createdAt": "string",
        "updatedAt": "string"
      }
    ]
    ```

## Book Endpoints

### Create Book

- **URL**: `/api/v1/books/create`
- **Method**: POST
- **Description**: Creates a new book.
- **Authorization**: Required (ADMIN role)
- **Request Body**:
  ```json
  {
    "authorId": "integer",
    "title": "string",
    "isbn": "string",
    "publicationYear": "string",
    "genre": "string"
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "id": "integer",
      "authorId": "integer",
      "title": "string",
      "isbn": "string",
      "publicationYear": "string",
      "genre": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```

### Update Book

- **URL**: `/api/v1/books/update/{bookId}`
- **Method**: PUT
- **Description**: Updates an existing book.
- **Authorization**: Required (ADMIN role)
- **Request Parameters**:
  - `bookId`: The ID of the book to be updated.
- **Request Body**:
  ```json
  {
    "authorId": "integer",
    "title": "string",
    "isbn": "string",
    "publicationYear": "string",
    "genre": "string"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "id": "integer",
      "authorId": "integer",
      "title": "string",
      "isbn": "string",
      "publicationYear": "string",
      "genre": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```

### Get Book

- **URL**: `/api/v1/books/get/{bookId}`
- **Method**: GET
- **Description**: Retrieves information about a specific book.
- **Authorization**: None required
- **Request Parameters**:
  - `bookId`: The ID of the book.
- **Response**:
  - **200 OK**:
    ```json
    {
      "id": "integer",
      "authorId": "integer",
      "title": "string",
      "isbn": "string",
      "publicationYear": "string",
      "genre": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```

### Get All Books

- **URL**: `/api/v1/books/get-all`
- **Method**: GET
- **Description**: Retrieves information about all books.
- **Authorization**: None required
- **Request Parameters**:
  - `offset` (optional): Offset for pagination (default: 0)
  - `limit` (optional): Limit for pagination (default: 10)
- **Response**:
  - **200 OK**:
    ```json
    [
      {
        "id": "integer",
        "authorId": "integer",
        "title": "string",
        "isbn": "string",
        "publicationYear": "string",
        "genre": "string",
        "createdAt": "string",
        "updatedAt": "string"
      }
    ]
    ```

### Get Books By Author ID

- **URL**: `/api/v1/books/get-by-author/{authorId}`
- **Method**: GET
- **Description**: Retrieves information about books by a specific author.
- **Authorization**: None required
- **Request Parameters**:
  - `authorId`: The ID of the author.
- **Response**:
  - **200 OK**:
    ```json
    [
      {
        "id": "integer",
        "authorId": "integer",
        "title": "string",
        "isbn": "string",
        "publicationYear": "string",
        "genre": "string",
        "createdAt": "string",
        "updatedAt": "string"
      }
    ]
    ```

### Search Books

- **URL**: `/api/v1/books/search`
- **Method**: GET
- **Description**: Searches books by title or genre.
- **Authorization**: None required
- **Request Parameters**:
  - `searchTerm`: The term to search for.
- **Response**:
  - **200 OK**:
    ```json
    [
      {
        "id": "integer",
        "authorId": "integer",
        "title": "string",
        "isbn": "string",
        "publicationYear": "string",
        "genre": "string",
        "createdAt": "string",
        "updatedAt": "string"
      }
    ]
    ```

### Delete Book

- **URL**: `/api/v1/books/delete/{bookId}`
- **Method**: DELETE
- **Description**: Deletes a book.
- **Authorization**: Required (ADMIN role)
- **Request Parameters**:
  - `bookId`: The ID of the book to be deleted.
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "string",
      "statusCode": "integer"
    }
    ```

## Author Endpoints

### Create Author

- **URL**: `/api/v1/authors/create`
- **Method**: POST
- **Description**: Creates a new author.
- **Authorization**: None required
- **Request Body**:
  ```json
  {
    "authorName": "string",
    "bio": "string"
  }
  ```
- **Response**:

  - **201 Created**:
    ```json
    {
      "id": "integer",
      "authorName": "string",
      "bio": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```

  ```

  ```

### Update Author

- **URL**: `/api/v1/authors/update/{authorId}`
- **Method**: PUT
- **Description**: Updates an existing author.
- **Authorization**: None required
- **Request Parameters**:
  - `authorId`: The ID of the author to be updated.
- **Request Body**:

  ```json
  {
    "authorName": "string",
    "bio": "string"
  }
  ```

- **Response**:
  - **200 OK**:
    ```json
    {
      "id": "integer",
      "authorName": "string",
      "bio": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```

### Get Author

- **URL**: `/api/v1/authors/get/{authorId}`
- **Method**: GET
- **Description**: Retrieves information about a specific author.
- **Authorization**: None required
- **Request Parameters**:
  - `authorId`: The ID of the author.
- **Response**:
  - **200 OK**:
    ```json
    {
      "id": "integer",
      "authorName": "string",
      "bio": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```

### Get All Authors

- **URL**: `/api/v1/authors/get-all`
- **Method**: GET
- **Description**: Retrieves information about all authors.
- **Authorization**: None required
- **Response**:
  - **200 OK**:
    ```json
    [
      {
        "id": "integer",
        "authorName": "string",
        "bio": "string",
        "createdAt": "string",
        "updatedAt": "string"
      }
    ]
    ```

### Delete Author

- **URL**: `/api/v1/authors/delete/{authorId}`
- **Method**: DELETE
- **Description**: Deletes an author.
- **Authorization**: None required
- **Request Parameters**:
  - `authorId`: The ID of the author to be deleted.
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "string",
      "statusCode": "integer"
    }
    ```

## Authentication Endpoints

### Sign Up

- **URL**: `/api/v1/auth/signup`
- **Method**: POST
- **Description**: Registers a new user.
- **Authorization**: None required
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "string"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "accessToken": "string",
      "user": "integer",
      "email": "string",
      "username": "string"
    }
    ```

### Sign In

- **URL**: `/api/v1/auth/signin`
- **Method**: POST
- **Description**: Logs in a user.
- **Authorization**: None required
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "accessToken": "string",
      "user": "integer",
      "email": "string",
      "username": "string"
    }
    ```

```

```
