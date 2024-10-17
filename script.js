const myLibrary = [];


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.toggleStatus = function() {
        this.read = !this.read;
    }
}


function addBookToLibrary() {
    // Receive input
    const newBook = new Book('', '', '', false);
    myLibrary.push(newBook);
}


function displayBook(book, index) {
const bookBlock = document.createElement('div');
    bookBlock.classList.add('book-block');
    // bookBlock.dataset.index = index;

    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookBlock.append(bookCard);

    const bookRemove = document.createElement('button');
    bookRemove.classList.add('book-remove');
    bookRemove.addEventListener('click', () => {
        bookBlock.remove();
        myLibrary.splice(index, 1);
    });
    const bookRemoveImg = document.createElement('img');
    bookRemoveImg.src = 'img/trash.png';
    bookRemove.append(bookRemoveImg);
    bookCard.append(bookRemove);

    const bookTitle = document.createElement('span');
    bookTitle.classList.add('book-title');
    bookTitle.append(document.createTextNode(book.title));
    bookCard.append(bookTitle);

    const bookAuthor = document.createElement('span');
    bookAuthor.classList.add('book-author');
    bookAuthor.append(document.createTextNode(book.author));
    bookCard.append(bookAuthor);

    const bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');
    const bookPages = document.createElement('span');
    bookPages.classList.add('book-pages');
    bookPages.append(document.createTextNode(`${book.pages} pages`));
    const bookStatus = document.createElement('button');
    bookStatus.classList.add('book-status');
    bookStatus.append(document.createTextNode(book.read ? 'Read' : 'Not read'));
    if (book.read) bookStatus.classList.add('read');
    bookStatus.addEventListener('click', function() {
        this.classList.toggle('read');
        this.textContent = book.read ? 'Not read' : 'Read';
        book.read = !book.read;
    });
    bookInfo.append(bookPages, bookStatus);
    bookBlock.append(bookInfo);

    frame.insertBefore(bookBlock, addBookButton);
}


function displayBooks() {
    for (const [index, book] of myLibrary.entries()) displayBook(book, index);
}


myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien', 295, false));
myLibrary.push(new Book("To Kill a Mockingbird", "Harper Lee", 281, true));
myLibrary.push(new Book("1984", "George Orwell", 328, false));
myLibrary.push(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true));
myLibrary.push(new Book("The Catcher in the Rye", "J.D. Salinger", 214, false));
myLibrary.push(new Book("Moby-Dick", "Herman Melville", 635, true));


const frame = document.getElementById('frame');
const addBookDialog = document.getElementById('add-book-dialog');
const addBookButton = document.getElementById('add-book-button');
const addBookSubmit = document.getElementById('add-book-submit');

addBookButton.addEventListener('click', () => {
    addBookDialog.showModal();
});
addBookSubmit.addEventListener('click', (event) => {
    event.preventDefault();

    const title = document.getElementById('book-title-input').value;
    const author = document.getElementById('book-author-input').value;
    const pages = document.getElementById('book-pages-input').value;
    const read = document.getElementById('book-read-input').value;

    if (![title, author, pages, read].includes('')) {
        const newBook = new Book(
            title,
            author,
            pages,
            read == 'y'
        )
        console.log(JSON.stringify(newBook));
        addBookDialog.close(JSON.stringify(newBook));
    }
});
addBookDialog.addEventListener('close', function() {
    if (this.returnValue) {
        const newBook = JSON.parse(this.returnValue);
        myLibrary.push(newBook);
        displayBook(newBook, myLibrary.length);
    }
})
displayBooks();