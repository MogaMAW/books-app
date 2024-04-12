package com.example.BooksBackend.exception;

public class NotAuthorizedException extends RuntimeException  {
    public NotAuthorizedException(String message) {
        super(message);
    }
}
