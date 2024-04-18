import { url } from "../store";

export const getBooksByUser = async () => {
  const response = await fetch(`${url}/books/get-all`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

//

export const searchBooks = async ({ searchTerm }) => {
  const response = await fetch(`${url}/books/search?searchTerm=${searchTerm}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};
