import React, { Fragment } from "react";
import { useState } from "react";
import { IconContext } from "react-icons";
import { FiSearch } from "react-icons/fi";
import { searchBooks } from "../../API/books";
import { useMutation } from "@tanstack/react-query";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch } from "react-redux";

export const SearchBooks = (props) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: searchBooks,
    onSuccess: (response) => {
      console.log("search response:::", response);
      props.onSuccess(response);
    },
    onError: (error) => {
      dispatch(
        showCardNotification({
          type: "error",
          message: error.message,
        })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const searchBookHandler = (event) => {
    event.preventDefault();
    if (!query) return;

    mutate({ searchTerm: query });
  };

  return (
    <Fragment>
      <div className="w-full grid place-items-center">
        <form
          className="relative w-full md:max-w-[600px]"
          onSubmit={(event) => searchBookHandler(event)}
        >
          <input
            type="text"
            onChange={(event) => setQuery(() => event.target.value)}
            value={query}
            className="w-full bg-gray-800 rounded-[32px] px-8 py-3
             border-[1px] border-gray-700 outline-none placeholder:text-gray-500
             pr-12 text-gray-200"
            placeholder={"Search books by title or category"}
            required
          />
          <button
            className={`cursor-pointer w-10 h-10 rounded-[50%] bg-gray-900
            flex items-center justify-center absolute top-[5px] right-[6px]
            disabled:bg-gray-700 disabled:shadow-[0px_0px_0px_4px_rgba(11,114,133,0.3)]`}
            type="submit"
            disabled={isLoading}
          >
            <span className="cursor-pointer">
              <IconContext.Provider
                value={{ size: "1.2rem", color: "#1098ad" }}
              >
                <FiSearch />
              </IconContext.Provider>
            </span>
          </button>
        </form>
      </div>
    </Fragment>
  );
};
