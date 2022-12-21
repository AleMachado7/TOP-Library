const myLibrary = [];
const bookGrid = document.querySelector(".books-grid");
let numberOfBooks = document.querySelector("#num-of-books");
numberOfBooks.textContent = myLibrary.length;
const popupForm = document.querySelector(".form-container");
let deleteButtons = document.querySelectorAll(".delete-book-button");

function Book(title, author, numberOfPages, readStatus) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readStatus = readStatus;
}

function addBookToLibrary(title, author, numberOfPages, readStatus) {
  myLibrary.push(
    new Book(
      `Title: ${title}`,
      `Author: ${author}`,
      `Number of Pages: ${numberOfPages}`,
      `Already read: ${readStatus}`
    )
  );
  numberOfBooks.textContent = myLibrary.length;
  displayBook();
  deleteButtons = document.querySelectorAll(".delete-book-button");
}

function displayBook() {
  bookGrid.replaceChildren();

  for (i = 0; i < myLibrary.length; i++) {
    let newBook = document.createElement("div");
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-book-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () =>
      deleteBook(deleteButton.parentElement)
    );

    Object.values(myLibrary[i]).forEach((value) => {
      let bookInfo = document.createElement("p");
      bookInfo.textContent = value;
      newBook.appendChild(bookInfo);
    });
    newBook.setAttribute("data-index", i);
    newBook.appendChild(deleteButton);
    newBook.classList.add("book");
    bookGrid.appendChild(newBook);
  }
}

function deleteBook(element) {
  let elementIndex = element.getAttribute("data-index");
  myLibrary.splice(elementIndex, 1);
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
  let bookRead = document.querySelector("#read").value;

  if (bookTitle === "" || bookAuthor === "" || bookPages === "") {
    event.preventDefault();
    return;
  }

  addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
  closeForm();
});
