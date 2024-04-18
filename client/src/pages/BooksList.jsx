import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
  showCardNotification,
  hideCardNotification,
} from "../store/actions/notification";
import { getBooksByUser as getAllBooks } from "../API/books";
import { BookCard } from "../components/UI/BookCard";
import { SearchBooks } from "../components/UI/SearchBooks";

export const BooksList = () => {
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();

  //   {
  //     "id": 1,
  //     "authorId": 9,
  //     "title": "To Kill a Mockingbird[ss]",
  //     "isbn": "0061120081",
  //     "publicationYear": "1960",
  //     "genre": "1960",
  //     "createdAt": "2024-04-13T18:35:14.129676",
  //     "updatedAt": "2024-04-13T18:56:25.855566",
  //     "author": {
  //         "id": 9,
  //         "authorName": "Harper Lee",
  //         "bio": "Harper Lee was an American novelist widely known for her Pulitzer Prize-winning novel 'To Kill a Mockingbird', which deals with the issues of racism and injustice in the American South.",
  //         "createdAt": "2024-04-13T14:22:06.251898",
  //         "updatedAt": "2024-04-13T14:22:06.251919",
  //         "hibernateLazyInitializer": {}
  //     }
  // },

  const { isLoading, data } = useQuery({
    queryKey: ["books"],
    queryFn: () => getAllBooks(),
    onSuccess: (response) => {
      setBooks(() => response);
    },
    onError: (error) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  console.log("data:::", data);

  useEffect(() => {
    const updateBooksHandler = () => {
      setBooks(() => data);
    };
    updateBooksHandler();
  }, [data]);

  console.log("books:::", books);

  const onSearchSuccessFullHandler = (books) => {
    setBooks(() => books);
  };

  return (
    <Fragment>
      <div
        className="py-14 w-full flex flex-col items-center justify-center
         gap-16"
      >
        <div className="w-full">
          <SearchBooks onSuccess={onSearchSuccessFullHandler} />
        </div>
        {isLoading && <div className="">Loading books...</div>}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
          xl:grid-cols-4 sxl:grid-cols-5 gap-2 gap-y-4"
        >
          {books?.map((book, index) => (
            <div className="" key={index}>
              <BookCard
                title={book.title}
                isbn={book.isbn}
                authorName={book.author.authorName}
              />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
