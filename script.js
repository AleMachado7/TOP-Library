const myLibrary = [];
const bookGrid = document.querySelector(".books-grid");
const numberOfBooks = document.querySelector("#num-of-books");
const popupForm = document.querySelector(".form-container");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  changeReadStatus() {
    this.read = !this.read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  numberOfBooks.textContent = myLibrary.length;
  displayBook();
}

function displayBook() {
  bookGrid.replaceChildren();

  // loop through the library array and get the objects to display
  for (let i = 0; i < myLibrary.length; i += 1) {
    const newBook = document.createElement("div");

    // loop through the object properties to display the values of each of then
    Object.entries(myLibrary[i]).forEach(([key, value]) => {
      const dataLabel = key.charAt(0).toUpperCase() + key.slice(1);
      const bookId = `book-${i}`;
      newBook.setAttribute("id", bookId);

      if (key === "read") {
        const statusDiv = document.createElement("div");
        statusDiv.style.cssText = "display: flex; gap: 8px;";

        const statusSwitch = document.createElement("input");
        statusSwitch.type = "checkbox";
        statusSwitch.checked = value;
        statusSwitch.id = "read-ckbox";

        statusSwitch.addEventListener("click", () => {
          const elementIndex = document
            .getElementById(bookId)
            .getAttribute("data-index");
          myLibrary[elementIndex].changeReadStatus();
        });

        const statusLabel = document.createElement("label");
        statusLabel.setAttribute("for", "read-ckbox");
        statusLabel.textContent = dataLabel;

        statusDiv.appendChild(statusLabel);
        statusDiv.appendChild(statusSwitch);

        newBook.appendChild(statusDiv);
      } else {
        const bookInfo = document.createElement("p");
        bookInfo.textContent = `${dataLabel}: ${value}`;
        newBook.appendChild(bookInfo);
      }
    });

    // add delete button to the book
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-book-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteBook(deleteButton.parentElement);
    });

    newBook.setAttribute("data-index", i);
    newBook.appendChild(deleteButton);
    newBook.classList.add("book");
    bookGrid.appendChild(newBook);
  }
}

function deleteBook(element) {
  const elementIndex = element.getAttribute("data-index");
  myLibrary.splice(elementIndex, 1);
  numberOfBooks.textContent = myLibrary.length;
  displayBook();
}

function openForm() {
  popupForm.classList.add("open-form");
}

function closeForm() {
  popupForm.classList.remove("open-form");
}

const openFormButton = document.querySelector("#add-book");
openFormButton.addEventListener("click", openForm);

const closeFormButton = document.querySelector("#close-form");
closeFormButton.addEventListener("click", closeForm);

const addBook = document.querySelector("#confirm");
addBook.addEventListener("click", (event) => {
  const bookTitle = document.querySelector("#title").value;
  const bookAuthor = document.querySelector("#author").value;
  const bookPages = document.querySelector("#pages").value;
  const bookRead = document.querySelector("#read").checked;

  if (bookTitle === "" || bookAuthor === "" || bookPages === "") {
    event.preventDefault();
    return;
  }

  addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
  closeForm();
});
