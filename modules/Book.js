class Book {
  constructor() { }

  /**
   * Function used to sort books alphabetically.
   */
  sortBooks = () => {
    Array.from(document.querySelectorAll("article:not(.hiddenBook)")).sort((a, b) => {
      const first = a.querySelector("summary").innerText.trim();
      const second = b.querySelector("summary").innerText.trim();

      if (first < second) return -1;
      if (first > second) return 1;

    }).forEach(div => {
      div.parentElement.appendChild(div);
    });
  };

  /**
   * Function that updates count in the footer X / Y
   */
  updateCount = () => {
    const allBooksEl = document.querySelector(".allBooks");
    const allFilteredBooksEl = document.querySelector(".filteredBooks");

    const allBooksNum = document.querySelectorAll("article").length;
    const allFilteredBooksNum = document.querySelectorAll("article:not(.hiddenBook)").length;

    allBooksEl.innerText = allBooksNum;
    allFilteredBooksEl.innerText = allFilteredBooksNum;
  };

  /**
   * Function that opens and closes book detail 
   * @param {object} e - pure html node
   */
  toggleOpen = e => {
    const summary = e.target;
    const detailEl = summary.parentElement;
    const figure = detailEl.previousElementSibling;
    const isDetailOpened = !detailEl.hasAttribute("open") && figure;

    summary.nodeName === "VAR" ? summary.parentElement.removeAttribute("open") : "";

    isDetailOpened ? this.handleDetail("close", detailEl, figure) : this.handleDetail("open", detailEl, figure);
  };

  /**
   * Function that styles book detail accordingly if it is opened or closed
   * @param {string} action - open / close
   * @param {object} detailEl - pure html node
   * @param {object} figure  - pure html node
   */
  handleDetail = (action, detailEl, figure) => {
    // Get book
    const article = detailEl.parentElement;

    switch (action) {
      case "open":

        // Then it must be 3 column - its closed
        detailEl.style.textAlign = "center";
        figure.style.display = "none";
        article.style.display = "grid";


        break;

      case "close":

        // Then it must be flex - its opened
        figure.style.display = "grid";
        figure.style.jutifyItems = "start";
        article.style.display = "flex";
        article.style.justifyContent = "space-evenly";

        break;

      default:
        break;
    }
  };

  /**
   * Function that extracts details from a book and maps them to single object
   * @param {object} book - pure html node
   */
  getBookDetails = book => {
    // Get book details
    const details = Array.from(book.querySelectorAll("var"));
    const detailsObj = [];

    details.map(detail => {

      // Book title is on diffrent place
      if (detail.previousElementSibling.nodeName === "SUMMARY") {
        detailsObj.bookTitle = detail.previousElementSibling.innerText.trim();
      }

      // Attach all types
      detailsObj[detail.dataset.type] = detail.innerText.trim();
    });

    return detailsObj;
  };

  /**
   * Performs the main search of the books
   * @param {object} e - pure html node
   */
  searchBooks = e => {

    // On clear search e is undefined
    e ? e.preventDefault() : "";

    // Get all searching fields
    const formData = Array.from(document.querySelectorAll(".header__form .search"));

    // Init empty obj to store filters
    window.searches = {};

    // Map searching fields into object keys and values
    formData.map(element => {
      element.type === "checkbox" ? searches[element.name] = element.checked
        :
        searches[element.name] = element.value;
    });

    // Finally display the books
    Array.from(document.querySelectorAll("article")).map(book => {
      const bookDetails = this.getBookDetails(book);
      const bookTitle = bookDetails.bookTitle;
      const author = bookDetails.author;
      const category = bookDetails.category;
      const isRegex = searches.regex;

      const configObj = {
        bookTitle, author, category, isRegex, book
      };

      this.displayBooks(searches.combo, configObj);

    });


    // Afterwards its needed to update the count
    this.updateCount();

    // And also sort them
    this.sortBooks();
  };

  /**
   * Attaches or removes class hiddenBook, according to search params
   * @param {object} combo - pure html node
   * @param {object} configObj - custom object with config for search
   * Note: .toLowerCase() on both searched texts and book info ensures that it is case insensitive
   */
  displayBooks = (combo, configObj) => {
    // Destructure config
    const { bookTitle, author, category, isRegex, book } = configObj;

    // Decide which combo it is
    let compared, searched;
    switch (combo) {
      case "name":

        if (!isRegex) {
          // Its standard search
          compared = bookTitle.toLowerCase();
          searched = searches.searchbar.toLowerCase();

          // show or hide
          compared.includes(searched) ? book.classList.remove("hiddenBook") : book.classList.add("hiddenBook");

        } else {
          // Its regex search
          compared = bookTitle;
          searched = searches.searchbar;

          // Show or hide
          (compared && searched.match(bookTitle)) ? book.classList.remove("hiddenBook") : book.classList.add("hiddenBook");
        }

        break;

      case "author":

        if (!isRegex) {
          // Its standard search
          compared = author.toLowerCase();
          searched = searches.searchbar.toLowerCase();

          // show or hide
          compared.includes(searched) ? book.classList.remove("hiddenBook") : book.classList.add("hiddenBook");

        } else {
          // Its regex search
          compared = author;
          searched = searches.searchbar;

          // Show or hide
          (compared && searched.match(author)) ? book.classList.remove("hiddenBook") : book.classList.add("hiddenBook");
        }

        break;

      case "authorname":

        if (!isRegex) {
          // Its standard search
          const comparedAuthor = author.toLowerCase();
          const comparedTitle = bookTitle.toLowerCase();
          searched = searches.searchbar.toLowerCase();

          // Here the logic is a bit complicated, so no ternary used
          if (comparedAuthor.includes(searched) && comparedTitle.includes(searched)) {
            book.classList.remove("hiddenBook");
          } else {
            book.classList.add("hiddenBook");
          }
        } else {
          searched = searches.searchbar;

          // Here the logic is a bit complicated, so no ternary used
          if (author && name && searched.match(bookTitle) && searched.match(author)) {
            book.classList.remove("hiddenBook");
          } else {
            book.classList.add("hiddenBook");
          }
        }



        break;

      case "category":

        if (!isRegex) {
          // Its standard search
          compared = category.toLowerCase();
          searched = searches.searchbar.toLowerCase();

          // show or hide
          compared.includes(searched) ? book.classList.remove("hiddenBook") : book.classList.add("hiddenBook");

        } else {
          // Its regex search
          compared = category;
          searched = searches.searchbar;

          // Show or hide
          (compared && searched.match(category)) ? book.classList.remove("hiddenBook") : book.classList.add("hiddenBook");
        }

        break;

      case "all":
        if (!isRegex) {
          const comparedBookTitle = bookTitle.toLowerCase();
          const comparedAuthor = author.toLowerCase();
          const comparedCategory = category.toLowerCase();
          searched = searches.searchbar.toLowerCase();

          // Here the logic is a bit complicated, so no ternary used
          if (comparedBookTitle.includes(searched) || comparedAuthor.includes(searched) || comparedCategory.includes(searched)) {
            book.classList.remove("hiddenBook");
          } else {
            book.classList.add("hiddenBook");
          }
        } else {
          compared = searches.searchbar;


          if (compared.match(bookTitle) || compared.match(author) || compared.match(category)) {
            book.classList.remove("hiddenBook");

          } else {
            book.classList.add("hiddenBook");
          }

        }

        break;

      default:
        break;
    }
  };

  /**
   * Clears searches
   */
  clearBooksSearch = () => {
    document.querySelector("form").reset();
    this.searchBooks();
    this.sortBooks();
    this.updateCount();
  };


}

export default Book;