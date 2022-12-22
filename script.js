const myLibrary = [];
const bookGrid = document.querySelector(".books-grid");
let numberOfBooks = document.querySelector("#num-of-books");
const popupForm = document.querySelector(".form-container");
let deleteButtons = document.querySelectorAll(".delete-book-button");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  function changeReadStatus() {
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

  for (i = 0; i < myLibrary.length; i++) {
    let newBook = document.createElement("div");
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-book-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteBook(deleteButton.parentElement)
    });

    Object.entries(myLibrary[i]).forEach(([key, value]) => {
      let dataLabel = key.charAt(0).toUpperCase() + key.slice(1);
      let bookInfo = document.createElement("p");
      bookInfo.textContent = dataLabel + ": " + value;
      newBook.appendChild(bookInfo);
      })

    newBook.setAttribute("data-index", i);
    newBook.appendChild(deleteButton);
    newBook.classList.add("book");
    bookGrid.appendChild(newBook);
  }
}

function deleteBook(element) {
  let elementIndex = element.getAttribute("data-index");
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
  let bookTitle = document.querySelector("#title").value;
  let bookAuthor = document.querySelector("#author").value;
  let bookPages = document.querySelector("#pages").value;
  let bookRead = document.querySelector("#read").checked;

  if (bookTitle === "" || bookAuthor === "" || bookPages === "") {
    event.preventDefault();
    return;
  }

  addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
  closeForm();
});
