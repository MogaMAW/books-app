import React, { Fragment } from "react";
import { OrderBook } from "./OrderBook";

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

export const BookCard = (props) => {
  return (
    <Fragment>
      <div
        className="bg-gray-900 flex flex-col items-center 
        justify-center gap-2 text-gray-400 border-2 border-gray-400
        p-8 rounded"
      >
        <div
          className="h-40 w-44 p-4 flex flex-col justify-between 
          items-center bg-gray-900 rounded text-gray-100 shadow-2xl
          border-[1px] border-gray-800"
        >
          <p className="text-center text-primary">{props.title}</p>
          <p className="text-sm text-gray-400">ISBN: {props.isbn}</p>
        </div>
        <div>
          <p>
            <span>By</span>
            <span className="font-thin italic ml-2">{props.authorName}</span>
          </p>
        </div>
        <div>
          <OrderBook />
        </div>
      </div>
    </Fragment>
  );
};
