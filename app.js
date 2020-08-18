"use strict";

import Book from "./modules/Book.js";

document.addEventListener("DOMContentLoaded", () => {

  // Init custom book class
  const bookInstance = new Book();

  // Custom properties
  const details = Array.from(document.querySelectorAll("details"));
  const form = document.querySelector(".header__form");
  const clearSearchBtn = document.querySelector(".header__clearSearch");

  // Attach events
  details.map(detail => detail.addEventListener("click", bookInstance.toggleOpen));
  form.addEventListener("submit", bookInstance.searchBooks);
  clearSearchBtn.addEventListener("click", bookInstance.clearBooksSearch);

  // On load defaults
  bookInstance.sortBooks();
  bookInstance.updateCount();
});