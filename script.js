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
}

Book.prototype.changeReadStatus = function() {
  this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  numberOfBooks.textContent = myLibrary.length;
  displayBook();
}

function displayBook() {
  bookGrid.replaceChildren();

  // loop through the library array and get the objects to display
  for (i = 0; i < myLibrary.length; i++) {
    let newBook = document.createElement("div");

    //loop through the object properties to display the values of each of then
    Object.entries(myLibrary[i]).forEach(([key, value]) => {
      let dataLabel = key.charAt(0).toUpperCase() + key.slice(1);
      let bookId = "book-" + i;
      newBook.setAttribute("id", bookId);

      if(key === 'read') { 
        let statusDiv = document.createElement("div");
        statusDiv.style.cssText = "display: flex; gap: 8px;";
        
        let statusSwitch = document.createElement('input');
        statusSwitch.type = 'checkbox';
        statusSwitch.checked = value;
        statusSwitch.id = "read-ckbox";

        statusSwitch.addEventListener("click", () => {
          let elementIndex = document.getElementById(bookId).getAttribute("data-index");
          myLibrary[elementIndex].changeReadStatus();
        })

        let statusLabel = document.createElement('label');
        statusLabel.setAttribute("for", "read-ckbox");
        statusLabel.textContent = dataLabel;

        statusDiv.appendChild(statusLabel);
        statusDiv.appendChild(statusSwitch);

        newBook.appendChild(statusDiv);
      } 
      else {
        let bookInfo = document.createElement("p");
        bookInfo.textContent = dataLabel + ": " + value;
        newBook.appendChild(bookInfo);
      }
    })

      // add delete button to the book 
      let deleteButton = document.createElement("button");
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
