const myLibrary = [];

function Book(name, author, numberOfPages, readStatus) {
    this.name = name;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.readStatus = readStatus;
}

function addBookToLibrary(name, author, numberOfPages, readStatus) {
    return myLibrary.push(new Book(name, author, numberOfPages, readStatus));
}