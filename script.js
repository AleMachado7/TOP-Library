const myLibrary = [];
const bookGrid = document.querySelector(".books-grid");
let numberOfBooks = document.querySelector("#num-of-books");
numberOfBooks.textContent = myLibrary.length;


function Book(name, author, numberOfPages, readStatus) {
    this.name = name;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.readStatus = readStatus;
}

function addBookToLibrary(name, author, numberOfPages, readStatus) {
    myLibrary.push(new Book(name, author, numberOfPages, readStatus));
    numberOfBooks.textContent = myLibrary.length;
}

function displayBook() {
    bookGrid.replaceChildren();

    myLibrary.forEach(book => {
        let newBook = document.createElement("div");
        newBook.classList.add("book");

        Object.values(book).forEach(value => {
            let bookInfo = document.createElement("p");
            bookInfo.textContent = value;
            newBook.appendChild(bookInfo);
        }); 
        bookGrid.appendChild(newBook);           
    });
}
